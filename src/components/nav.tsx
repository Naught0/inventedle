import React from "react";

export function Nav() {
  return (
    <nav className="flex flex-row justify-center gap-3 px-12 py-6 text-center">
      <div className="inline-flex w-full max-w-screen-md flex-wrap items-center justify-center gap-3">
        <strong className="border-b border-r border-b-white border-r-white p-3 text-3xl lg:text-4xl">
          <span className="text-primary">Invented</span>le
        </strong>
        <span className="text-base italic lg:text-xl">
          the inventurous daily guessing game
        </span>
      </div>
    </nav>
  );
}
