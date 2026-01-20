import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { BiSolidCloudUpload } from "react-icons/bi";

export function ImportLocalGamesLink({
  gamesToImport,
}: {
  gamesToImport: number;
}) {
  return (
    <Link
      className={buttonVariants({
        variant: "ghost",
        className: "inline-flex w-full items-center gap-2",
      })}
      href="/import"
    >
      <BiSolidCloudUpload className="text-2xl" />
      Import {gamesToImport} game{gamesToImport === 1 ? "" : "s"}
    </Link>
  );
}
