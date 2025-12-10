import { Game } from "@/components/game";
import { Hyperlink } from "@/components/hyperlink";
import { ImageWithCaption } from "@/components/image-with-caption";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { InventionOfTheDayModel } from "@/db/prisma/generated/models";
import { redirect, RedirectType } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const iotd = await db.inventionOfTheDay.findUnique({
    where: { id: parseInt(id) },
  });
  if (!iotd) {
    return redirect(`/`, RedirectType.replace);
  }

  return <GamePage iotd={iotd} />;
}

export async function GamePage({ iotd }: { iotd: InventionOfTheDayModel }) {
  const invention = await db.invention.findUnique({
    where: { id: iotd.invention_id },
  });
  if (!invention) {
    throw new Error("Something has gone horribly wrong");
  }

  return (
    <div className="flex w-full flex-col items-center gap-3 p-3 lg:gap-6">
      <h2 className="text-muted-foreground text-center text-xl font-normal italic">
        Inventedle #{iotd.id}
      </h2>
      <h2 className="text-center text-3xl font-normal">
        <span className="text-far-red font-extrabold">{invention.name}</span>
      </h2>
      <div className="grid w-full max-w-screen-sm grid-cols-1 flex-row flex-wrap justify-center gap-6 lg:max-w-screen-lg lg:grid-cols-2 lg:flex-nowrap lg:gap-9">
        {invention.image_url && (
          <div className="flex flex-1 flex-grow basis-1/2 flex-col">
            <ImageWithCaption
              className="max-h-80 w-full max-w-[95vw] rounded object-contain lg:max-h-[512px]"
              src={invention.image_url}
              alt={`${invention.name}`}
              width={1280}
              height={720}
              preload
            >
              {invention.image_url && (
                <div className="inline-flex h-4 items-center gap-1.5">
                  <span>
                    image from{" "}
                    {new URL(invention.image_url).hostname.split(".")[1]}
                  </span>
                  <Separator
                    orientation="vertical"
                    className="bg-muted-foreground"
                  />
                  <Hyperlink
                    href={invention.invention_link ?? invention.image_url}
                    className="inline-flex items-center gap-1"
                  >
                    source
                  </Hyperlink>
                </div>
              )}
            </ImageWithCaption>
          </div>
        )}
        <Game invention={invention} />
      </div>
    </div>
  );
}
