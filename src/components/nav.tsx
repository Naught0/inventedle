import { Suspense } from "react";
import Logo from "./logo";
import { SigninButton } from "./signin-button";

export function Nav() {
  return (
    <nav className="flex w-full flex-row flex-wrap items-center justify-center gap-3 px-3 text-center md:px-12">
      <div className="relative w-full max-w-screen-lg">
        <div className="absolute right-0 top-0 hidden lg:block">
          <Suspense fallback={<SigninButton loading={true} />}>
            <SigninButton />
          </Suspense>
        </div>
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-3 font-mono">
          <Logo />
          <span className="text-base italic lg:text-xl">
            the inventurous daily guessing game
          </span>
          <div className="lg:hidden">
            <Suspense fallback={<SigninButton loading={true} />}>
              <SigninButton />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
}
