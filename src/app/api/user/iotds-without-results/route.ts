import { db } from "@/db";
import { getServerSession } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession();
  if (!session) return new Response(JSON.stringify(null), { status: 401 });

  const results = await db.result.findMany({
    where: {
      user_id: session.user.id,
    },
  });
  const iotdMissingResult = await db.inventionOfTheDay.findMany({
    where: {
      id: {
        notIn: results.map((result) => result.iotd_id),
      },
    },
    select: {
      id: true,
    },
  });
  return new Response(JSON.stringify(iotdMissingResult), { status: 200 });
}
