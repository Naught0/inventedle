"server-only";

import { db } from "@/db";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "./auth";

export interface RateLimitOptions {
  limit: number;
  window: number;
  identifier: string;
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Remaining requests in the current window */
  remaining: number;
  /** Total requests allowed per window */
  limit: number;
  /** Timestamp when the window resets (in seconds) */
  reset: number;
  /** Seconds until retry is allowed (when not allowed) */
  retryAfter: number;
}

export interface RateLimitConfig {
  /** Maximum requests allowed per window */
  limit: number;
  /** Window duration in seconds */
  window: number;
  /** Function to extract identifier from request */
  identifierExtractor?: (req: NextRequest) => string;
}

/**
 * Fixed window rate limiter using SQLite/Prisma
 * Stores request counts per identifier per time window
 */
export class RateLimiter {
  /**
   * Check rate limit and increment counter if allowed
   * Uses atomic upsert to handle concurrent requests
   */
  static async check(options: RateLimitOptions): Promise<RateLimitResult> {
    const now = new Date();
    const windowStart = new Date(
      Math.floor(now.getTime() / (options.window * 1000)) *
        (options.window * 1000),
    );
    const windowEnd = new Date(windowStart.getTime() + options.window * 1000);
    const reset = Math.floor(windowEnd.getTime() / 1000);

    // Clean up expired records (older than 2x window to prevent bloat)
    const expiryThreshold = new Date(now.getTime() - options.window * 2 * 1000);
    await db.rateLimit.deleteMany({
      where: {
        ttl: {
          lt: expiryThreshold,
        },
      },
    });

    // Atomic upsert to handle concurrent requests
    const record = await db.$transaction(async (tx) => {
      // First, try to find existing record
      const existing = await tx.rateLimit.findUnique({
        where: {
          identifier_window: {
            identifier: options.identifier,
            window: windowStart,
          },
        },
      });

      if (existing) {
        // Increment count
        return await tx.rateLimit.update({
          where: {
            identifier_window: {
              identifier: options.identifier,
              window: windowStart,
            },
          },
          data: {
            count: existing.count + 1,
            ttl: windowEnd,
          },
        });
      } else {
        // Create new record
        return await tx.rateLimit.create({
          data: {
            identifier: options.identifier,
            window: windowStart,
            count: 1,
            ttl: windowEnd,
          },
        });
      }
    });

    const remaining = Math.max(0, options.limit - record.count);
    const allowed = record.count <= options.limit;
    const retryAfter = allowed
      ? 0
      : Math.ceil((windowEnd.getTime() - now.getTime()) / 1000);

    return {
      allowed,
      remaining,
      limit: options.limit,
      reset,
      retryAfter,
    };
  }

  /**
   * Create a NextResponse with 429 status and rate limit headers
   */
  static createLimitResponse(result: RateLimitResult): NextResponse {
    return new NextResponse(
      JSON.stringify({
        error: "Too Many Requests",
        message: `Rate limit exceeded. Retry after ${result.retryAfter} seconds.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": String(result.limit),
          "X-RateLimit-Remaining": String(result.remaining),
          "X-RateLimit-Reset": String(result.reset),
          "Retry-After": String(result.retryAfter),
        },
      },
    );
  }

  /**
   * Helper to get client identifier from request
   * Supports IP address, user ID, or custom identifier
   */
  static async getIdentifier(
    req: NextRequest,
    options: {
      useIp?: boolean;
      useUserId?: boolean;
      customHeader?: string;
    } = {},
  ): Promise<string> {
    // Try custom header first
    if (options.customHeader) {
      const custom = req.headers.get(options.customHeader);
      if (custom) return custom;
    }

    if (options.useUserId) {
      const session = await getServerSession({ headers: req.headers });
      if (session) return `user:${session.user.id}`;
    }

    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
      // Get the first IP in the list (client IP)
      const ip = forwarded.split(",")[0].trim();
      return `ip:${ip}`;
    }

    // Fallback to x-real-ip
    const realIp = req.headers.get("x-real-ip");
    if (realIp) return `ip:${realIp}`;

    // Generate a generic identifier if no IP is available
    throw new Error("Unable to determine client identifier");
  }

  /**
   * Wrap an API route handler with rate limiting
   * @param config Rate limit configuration
   * @param handler The API route handler to wrap
   * @returns Wrapped handler with rate limiting
   */
  static async wrapHandler(
    config: RateLimitConfig,
    handler: (req: NextRequest) => Promise<NextResponse>,
  ): Promise<(req: NextRequest) => Promise<NextResponse>> {
    return async (req: NextRequest): Promise<NextResponse> => {
      try {
        const identifier = config.identifierExtractor
          ? config.identifierExtractor(req)
          : await RateLimiter.getIdentifier(req);

        const result = await RateLimiter.check({
          limit: config.limit,
          window: config.window,
          identifier,
        });

        if (!result.allowed) {
          return RateLimiter.createLimitResponse(result);
        }

        const response = await handler(req);

        // Add rate limit headers to the response
        response.headers.set("X-RateLimit-Limit", String(result.limit));
        response.headers.set("X-RateLimit-Remaining", String(result.remaining));
        response.headers.set("X-RateLimit-Reset", String(result.reset));

        return response;
      } catch (error) {
        console.error("Rate limiting error:", error);
        // Fail open - allow request through if rate limiting fails
        return handler(req);
      }
    };
  }
}

/**
 * Factory function to create rate limiters with specific configurations
 */
export function createRateLimiter(config: RateLimitConfig) {
  return {
    limit: config.limit,
    window: config.window,
    wrapHandler: <T extends (req: NextRequest) => Promise<NextResponse>>(
      handler: T,
    ) => RateLimiter.wrapHandler(config, handler),
  };
}
