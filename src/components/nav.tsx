import { Help } from "./help";
import Logo from "./logo";

export function Nav() {
  return (
    <nav className="flex flex-row flex-wrap items-center justify-center gap-3 px-12 py-6 text-center">
      <div className="inline-flex w-full max-w-screen-md flex-shrink basis-[512px] flex-wrap items-center justify-center gap-3">
        <Logo />
        <span className="text-base italic lg:text-xl">
          the inventurous daily guessing game
        </span>
        <Help />
      </div>
    </nav>
  );
}
