import React from "react";

export function Nav() {
  return (
    <nav className="flex flex-row justify-center gap-3 px-12 py-6 text-xl">
      <div className="inline-flex w-full max-w-screen-md items-center justify-center gap-3">
        <strong className="border-b border-r border-b-white border-r-white p-3 text-3xl lg:text-4xl">
          <span className="text-muted-foreground">Invented</span>le
        </strong>
        <span>the inventurous daily guessing game</span>
      </div>
    </nav>
  );
}
