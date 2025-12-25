import Logo from "./logo";

export function Nav() {
  return (
    <nav className="flex w-full flex-row flex-wrap items-center justify-center gap-3 px-3 text-center md:px-12">
      <div className="relative w-full max-w-screen-lg">
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-3">
          <Logo />
          <span className="text-muted-foreground text-base italic lg:text-xl">
            the inventurous daily guessing game
          </span>
        </div>
      </div>
    </nav>
  );
}
