"server-only";

import { RateLimiter as RabbitRateLimiter } from "@rabbit-company/rate-limiter";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "./auth";

export interface RateLimitOptions {
  limit: number;
  window: number;
  identifier: string;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  reset: number;
  retryAfter: number;
}

export interface RateLimitConfig {
  limit: number;
  window: number;
  identifierExtractor?: (req: NextRequest) => string;
}

const limiterCache = new Map<string, RabbitRateLimiter>();

function getLimiter(limit: number, window: number): RabbitRateLimiter {
  const key = `${limit}:${window}`;
  if (!limiterCache.has(key)) {
    limiterCache.set(
      key,
      new RabbitRateLimiter({
        window: window * 1000,
        max: limit,
        cleanupInterval: 30 * 1000,
        enableCleanup: true,
      }),
    );
  }
  return limiterCache.get(key)!;
}

export class RateLimiter {
  static async check(options: RateLimitOptions): Promise<RateLimitResult> {
    const rl = getLimiter(options.limit, options.window);
    const result = rl.check("default", options.identifier);

    const reset = Math.floor(result.reset / 1000);
    const retryAfter = result.limited
      ? Math.ceil((result.reset - Date.now()) / 1000)
      : 0;

    return {
      allowed: !result.limited,
      remaining: result.remaining,
      limit: options.limit,
      reset,
      retryAfter,
    };
  }

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

  static async getIdentifier(
    req: NextRequest,
    options: {
      useIp?: boolean;
      useUserId?: boolean;
      customHeader?: string;
    } = {},
  ): Promise<string> {
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
      const ip = forwarded.split(",")[0].trim();
      return `ip:${ip}`;
    }

    const realIp = req.headers.get("x-real-ip");
    if (realIp) return `ip:${realIp}`;

    throw new Error("Unable to determine client identifier");
  }

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

        response.headers.set("X-RateLimit-Limit", String(result.limit));
        response.headers.set("X-RateLimit-Remaining", String(result.remaining));
        response.headers.set("X-RateLimit-Reset", String(result.reset));

        return response;
      } catch (error) {
        console.error("Rate limiting error:", error);
        return handler(req);
      }
    };
  }
}

export function createRateLimiter(config: RateLimitConfig) {
  return {
    limit: config.limit,
    window: config.window,
    wrapHandler: <T extends (req: NextRequest) => Promise<NextResponse>>(
      handler: T,
    ) => RateLimiter.wrapHandler(config, handler),
  };
}
