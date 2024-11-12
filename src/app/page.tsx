import { Game } from "@/components/game";
import { Hyperlink } from "@/components/hyperlink";
import { ImageWithCaption } from "@/components/image-with-caption";
import { Separator } from "@/components/ui/separator";
import { getInventionOfTheDay } from "@/db/actions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const invention = await getInventionOfTheDay();
  return (
    <div className="flex w-full flex-col items-center gap-3 p-3 lg:gap-6">
      <h2 className="text-center text-2xl md:text-3xl">
        <span className="text-foreground font-extrabold">{invention.name}</span>
      </h2>
      <div className="grid w-full max-w-screen-sm grid-cols-1 flex-row flex-wrap justify-center gap-6 lg:max-w-screen-lg lg:grid-cols-2 lg:flex-nowrap lg:gap-9">
        <div className="flex-grow basis-1/2">
          <Game invention={invention} />
        </div>
        <div className="flex min-w-64 flex-1 basis-1/2 flex-col gap-6">
          <ImageWithCaption
            className="max-h-80 w-full max-w-[95vw] object-contain lg:max-h-[512px]"
            src={`/img/inventions/${invention.id}.webp`}
            alt={`${invention.name}`}
            width={1280}
            height={720}
            priority
          >
            {invention.image_url && (
              <div className="inline-flex h-4 items-center gap-1.5">
                <span>
                  image from{" "}
                  {new URL(invention.image_url!).hostname.split(".")[1]}
                </span>
                <Separator
                  orientation="vertical"
                  className="bg-muted-foreground"
                />
                <Hyperlink
                  href={invention.image_url}
                  className="inline-flex items-center gap-1"
                >
                  original
                </Hyperlink>
              </div>
            )}
          </ImageWithCaption>
        </div>
      </div>
    </div>
  );
}
