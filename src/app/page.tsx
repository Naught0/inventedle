import { Game } from "@/components/game";
import { getInventionOfTheDay } from "@/db/actions";

export default async function Page() {
  const invention = await getInventionOfTheDay();
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex w-full max-w-screen-sm flex-col gap-6">
        <h1 className="text-4xl">
          <span className="font-black text-cyan-200">{invention.name}</span>
        </h1>
        <Game invention={invention} />
      </div>
    </div>
  );
}
