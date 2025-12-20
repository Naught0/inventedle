import { db } from "@/db";
import { FriendStatus } from "@/db/prisma/generated/enums";
import { getFriendship } from "@/db/server-only";
import { getServerSession } from "@/lib/auth";
import { NextRequest } from "next/server";
import { stringify } from "superjson";

export async function GET() {
  const session = await getServerSession();
  if (!session) return new Response(null, { status: 401 });

  const ret = stringify(await getFriendship(session.user.id));
  return new Response(ret, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return new Response(null, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  const status = req.nextUrl.searchParams.get("status");
  if (!id || !status) return new Response(null, { status: 400 });

  await db.friendship.update({
    where: { id },
    data: {
      status: status as FriendStatus,
    },
  });
  return new Response(null, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return new Response(null, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return new Response(null, { status: 400 });

  await db.friendship.delete({ where: { id } });
  return new Response(null, { status: 200 });
}
