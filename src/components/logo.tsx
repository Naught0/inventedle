"use client";
import { useState } from "react";
import { Dangle } from "./animations/dangle";
import { MdLightbulb } from "react-icons/md";

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <strong
      className="border-muted-foreground inline-flex select-none rounded-lg border-b-2 border-r-2 p-3 text-4xl lg:text-5xl"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <span>Invented</span>
      <Dangle isHovering={hovered}>
        <span className="text-primary">
          le{" "}
          <MdLightbulb className="-ml-4 -mt-2 inline p-0 text-yellow-300 lg:-ml-8" />
        </span>
      </Dangle>
    </strong>
  );
}
