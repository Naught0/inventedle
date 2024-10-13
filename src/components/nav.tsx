import React from "react";

export function Nav() {
  return (
    <nav className="flex flex-row justify-center gap-3 text-xl">
      <div className="w-full max-w-screen-md">
        <strong className="text-3xl lg:text-4xl">Inventedle</strong>
        <span>: the inventurous daily guessing game</span>
      </div>
    </nav>
  );
}
