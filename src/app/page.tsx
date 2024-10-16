import { Game } from "@/components/game";
import { Hyperlink } from "@/components/hyperlink";
import { ImageWithCaption } from "@/components/image-with-caption";
import { getInventionOfTheDay } from "@/db/actions";

export default async function Page() {
  const invention = await getInventionOfTheDay();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-3 lg:gap-6">
      <h2 className="text-center text-3xl lg:text-5xl">
        <span className="text-primary font-black">{invention.name}</span>
      </h2>
      <div className="flex w-full max-w-screen-sm flex-row flex-wrap justify-center gap-9 lg:max-w-screen-lg lg:flex-nowrap">
        <div className="flex min-w-64 flex-1 basis-1/2 flex-col gap-6">
          <ImageWithCaption
            className="max-h-80 w-full min-w-72 max-w-[95vw] object-contain lg:max-h-[512px]"
            src={`/img/inventions/${invention.id}.webp`}
            alt={`${invention.name}`}
            width={1280}
            height={720}
            priority
          >
            {invention.image_url && (
              <>
                image from{" "}
                {new URL(invention.image_url!).hostname.split(".")[1]} |{" "}
                <Hyperlink
                  href={invention.image_url}
                  className="inline-flex items-center gap-1"
                >
                  original
                </Hyperlink>
              </>
            )}
          </ImageWithCaption>
        </div>
        <div className="flex-grow basis-1/2">
          <Game invention={invention} />
        </div>
      </div>
    </div>
  );
}
