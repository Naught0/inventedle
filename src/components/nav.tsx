import { Suspense } from "react";
import Logo from "./logo";
import { SigninButton } from "./signin-button";

export function Nav() {
  return (
    <nav className="flex flex-row flex-wrap items-center justify-center gap-3 px-10 text-center md:px-12">
      <div className="absolute right-16 top-0 m-auto hidden lg:block">
        <Suspense fallback={<SigninButton loading={true} />}>
          <SigninButton />
        </Suspense>
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-3 font-mono">
        <Logo />
        <span className="text-base italic lg:text-xl">
          the inventurous daily guessing game
        </span>
        <Suspense>
          <div className="lg:hidden">
            <SigninButton />
          </div>
        </Suspense>
      </div>
    </nav>
  );
}
