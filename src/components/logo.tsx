"use client";
import { useState } from "react";
import { Dangle } from "./animations/dangle";
import { MdLightbulb } from "react-icons/md";
import Link from "next/link";

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href="/" prefetch={false}>
      <strong
        className="border-muted-foreground inline-flex select-none rounded-lg border-b-2 border-r-2 p-3 font-sans text-3xl md:text-4xl lg:text-5xl"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <span>Invented</span>
        <Dangle isHovering={hovered}>
          <span className="text-primary whitespace-nowrap">
            le{" "}
            <MdLightbulb className="-mt-3 inline p-0 text-yellow-300 lg:-ml-4" />
          </span>
        </Dangle>
      </strong>
    </Link>
  );
}
