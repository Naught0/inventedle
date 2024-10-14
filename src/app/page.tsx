import { Game } from "@/components/game";
import { ImageWithCaption } from "@/components/image-with-caption";
import { getInventionOfTheDay } from "@/db/actions";
import { PiArrowUpRightLight } from "react-icons/pi";

export default async function Page() {
  const invention = await getInventionOfTheDay();
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-row flex-wrap justify-center gap-9">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl lg:text-4xl">
            <span className="text-primary font-black">{invention.name}</span>
          </h2>

          <ImageWithCaption
            className="max-h-[70vh] max-w-[512px] bg-white/50"
            src={`/img/inventions/${invention.id}.webp`}
            alt={`${invention.name}`}
            width={1280}
            height={720}
          >
            {invention.image_url && (
              <>
                image from wikipedia |{" "}
                <a
                  href={invention.image_url}
                  className="inline-flex items-center gap-1"
                >
                  original <PiArrowUpRightLight />
                </a>
              </>
            )}
          </ImageWithCaption>
        </div>
        <Game invention={invention} />
      </div>
    </div>
  );
}
