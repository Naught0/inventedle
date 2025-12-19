"server-only";
import { TZDate } from "@date-fns/tz";
import { format, isSameDay, subMonths } from "date-fns";
import { db } from ".";
import { getIOTD, getRandomInvention } from "./actions";
import { type Metadata } from "next";
import { FriendshipModel, ResultModel } from "./prisma/generated/models";

/**
 * Creates an Invention of the Day unless one has already been created for today (EST)
 *
 */
export async function createIOTD() {
  const now = new TZDate(new Date(), "America/New_York");
  const iotd = await getIOTD();

  if (iotd && isSameDay(new TZDate(iotd.created_at, "America/New_York"), now)) {
    throw new Error("IOTD already exists for today");
  }

  console.log(`Creating IOTD for ${now.toDateString()} at`, now);
  const avoidIOTDs = (
    await db.inventionOfTheDay.findMany({
      select: { invention_id: true },
      distinct: ["invention_id"],
      where: {
        created_at: {
          gt: subMonths(now, 3),
        },
      },
    })
  ).map((i) => i.invention_id);
  const avoidBadInventions = (
    await db.invention.findMany({
      select: { id: true },
      distinct: ["id"],
      where: {
        OR: [
          { id: { in: avoidIOTDs } },
          { image_url: { equals: null } },
          { description: { equals: "" } },
          { invention_link: { equals: null } },
        ],
      },
    })
  ).map((i) => i.id);
  console.log(
    `Avoiding ${avoidIOTDs.length} IOTDs and ${avoidBadInventions.length} bad inventions`,
  );

  const invention = await getRandomInvention([
    ...avoidIOTDs,
    ...avoidBadInventions,
  ]);
  const newIotd = await db.inventionOfTheDay.create({
    data: {
      invention_id: invention.id,
    },
  });
  return newIotd;
}

export type Stats = Record<"1" | "2" | "3" | "4" | "5" | "X", number>;

export async function getUserGameStats(userId: string) {
  return await getGuessStats({ userId });
}

export async function getIOTDStats(iotdId: number) {
  return await getGuessStats({ iotdId });
}

async function getGuessStats({
  iotdId,
  userId,
}: {
  iotdId?: number;
  userId?: string;
}): Promise<Stats> {
  const wins = await db.result.groupBy({
    by: ["num_guesses"],
    _count: { _all: true },
    where: {
      user_id: userId,
      iotd_id: iotdId,
      win: true,
    },
  });
  const losses = await db.result.count({
    where: {
      win: false,
      iotd_id: iotdId,
      user_id: userId,
      num_guesses: { gte: 5 },
    },
  });

  // low to high
  wins.sort((a, b) => a.num_guesses - b.num_guesses);
  const stats = Object.fromEntries(
    wins.map((r) => [r.num_guesses, r._count._all]),
  ) as Stats;
  stats["X"] = losses;
  return stats;
}

export async function generateIOTDMeta(iotdId?: number): Promise<Metadata> {
  const iotd = iotdId
    ? await db.inventionOfTheDay.findUnique({
        where: { id: iotdId },
        include: { invention: true },
      })
    : await getIOTD();
  const title = `Inventedle${iotd?.id ? ` #${iotd.id}` : ""}`;
  const description = "The inventurous daily guessing game";
  const imageUrl = iotd?.invention.image_url;
  const images = imageUrl ? [{ url: imageUrl }] : [];
  return {
    title,
    description,
    openGraph: {
      releaseDate: iotd?.created_at
        ? format(new TZDate(iotd?.created_at, "America/New_York"), "yyyy-MM-dd")
        : "today",
      title,
      description,
      url: `https://inventedle.jamese.dev${iotd?.id ? `/${iotd.id}` : ""}`,
      siteName: "Inventedle",
      images,
    },
  };
}

export async function getFriendship(userId: string) {
  if (!userId) return [];

  return await db.friendship.findMany({
    where: {
      OR: [
        {
          recipientId: userId,
        },
        {
          requesterId: userId,
        },
      ],
    },
    include: {
      recipient: {
        select: {
          id: true,
          name: true,
          image: true,
          isPublic: true,
        },
      },
      requester: {
        select: {
          id: true,
          name: true,
          image: true,
          isPublic: true,
        },
      },
    },
    omit: {
      recipientId: true,
      requesterId: true,
    },
  });
}

export async function getFriendStatus(userId: string, friendId: string) {
  return await db.friendship.findFirst({
    where: {
      OR: [
        {
          recipientId: userId,
          requesterId: friendId,
        },
        {
          recipientId: friendId,
          requesterId: userId,
        },
      ],
    },
  });
}

export async function getIOTDFriendStats(iotdId: number, userId: string) {
  const iotd = await db.inventionOfTheDay.findUnique({ where: { id: iotdId } });
  if (!iotd) throw new Error("IOTD not found");

  // FIXME: Make this return only friends
  // const user = await db.user.findUnique({
  //   where: { id: userId },
  //   include: {
  //     friendRequestsReceived: {
  //       include: {
  //         requester: { select: { id: true, image: true, name: true } },
  //       },
  //     },
  //     friendRequestsSent: {
  //       include: {
  //         recipient: { select: { id: true, image: true, name: true } },
  //       },
  //     },
  //   },
  // });
  // if (!user) throw new Error("User not found");
  // const friends = [
  //   ...user.friendRequestsSent
  //     .filter((f) => f.status === "ACCEPTED")
  //     .map((f) => f.recipient),
  //   ...user.friendRequestsReceived
  //     .filter((f) => f.status === "ACCEPTED")
  //     .map((f) => f.requester),
  // ];

  const friends = await db.user.findMany();

  const results = await db.result.findMany({
    where: {
      iotd_id: iotdId,
      user_id: {
        in: friends.map((f) => f.id),
      },
    },
  });
  return results.reduce(
    (acc, val) => {
      if (!val.win && val.num_guesses >= 5) {
        acc["X"].push(val);
        return acc;
      }
      acc[val.num_guesses.toString()].push(val);
      return acc;
    },
    {
      "1": [],
      "2": [],
      "3": [],
      "4": [],
      "5": [],
      X: [],
    } as Record<string, ResultModel[]>,
  );
}

function getFriendFromFriendship(userId: string, friendship: FriendshipModel) {
  if (friendship.recipientId === userId) return friendship.requester;
  if (friendship.requesterId === userId) return friendship.recipient;
  return null;
}
