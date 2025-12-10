import { Help } from "./help";
import Logo from "./logo";

export function Nav() {
  return (
    <nav className="flex flex-row flex-wrap items-center justify-center gap-3 px-10 py-3 text-center md:px-12">
      <div className="flex w-full max-w-screen-md flex-shrink basis-[512px] flex-col flex-wrap items-center justify-center gap-3 font-mono">
        <Logo />
        <span className="text-base italic lg:text-xl">
          the inventurous daily guessing game
        </span>
        <Help />
      </div>
    </nav>
  );
}
