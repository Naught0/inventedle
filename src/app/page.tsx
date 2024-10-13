import { Game } from "@/components/game";
import { getInventionOfTheDay } from "@/db/actions";

export default async function Page() {
  const invention = await getInventionOfTheDay();
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <div className="max-w-screen-sm">
        <Game invention={invention} />
      </div>
    </div>
  );
}
