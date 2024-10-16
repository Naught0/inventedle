import { Game } from "@/components/game";
import { Hyperlink } from "@/components/hyperlink";
import { ImageWithCaption } from "@/components/image-with-caption";
import { getInventionOfTheDay } from "@/db/actions";

export default async function Page() {
  const invention = await getInventionOfTheDay();
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-screen-sm flex-row flex-wrap justify-center gap-9 lg:max-w-screen-lg lg:flex-nowrap">
        <div className="flex min-w-64 flex-1 basis-1/2 flex-col gap-6">
          <h2 className="text-2xl lg:text-4xl">
            <span className="text-primary font-black">{invention.name}</span>
          </h2>

          <ImageWithCaption
            className="max-h-80 w-full max-w-[512px] object-contain lg:max-h-[512px]"
            src={`/img/inventions/${invention.id}.webp`}
            alt={`${invention.name}`}
            width={1280}
            height={720}
            priority
          >
            {invention.image_url && (
              <>
                image from wikipedia |{" "}
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
