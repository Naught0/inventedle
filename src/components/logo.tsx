"use client";
import { useState } from "react";
import { Dangle } from "./animations/dangle";
import { FaLightbulb } from "react-icons/fa6";
import Link from "next/link";

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      className="border-muted-foreground flex w-fit flex-col items-center justify-center rounded-lg text-center font-sans text-4xl sm:text-5xl lg:text-4xl"
      href="/"
      prefetch={false}
    >
      <strong
        className="inline-flex flex-nowrap"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <span>Invented</span>
        <Dangle isHovering={hovered}>
          <span className="text-primary whitespace-nowrap">
            le{" "}
            <FaLightbulb className="lg:-pl-2 -ml-4 -mt-2 inline pl-4 text-yellow-300 lg:-mt-2" />
          </span>
        </Dangle>
      </strong>
      <span className="text-muted-foreground -ml-4 pl-4 text-sm font-light italic sm:text-base">
        the inventurous daily guessing game
      </span>
    </Link>
  );
}
