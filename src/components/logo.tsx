"use client";
import { useState } from "react";
import { Dangle } from "./animations/dangle";

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <strong
      className="inline-flex select-none border-b border-r border-white p-3 text-3xl lg:text-5xl"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <span>Invented</span>
      <Dangle isHovering={hovered}>
        <span className="text-primary">le</span>
      </Dangle>
    </strong>
  );
}
