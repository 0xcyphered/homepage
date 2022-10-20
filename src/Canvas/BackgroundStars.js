import React from "react";
import StarBox from "./StarBox";

export default function BackgroundStars({ count }) {
  return (
    <>
      {new Array(count).fill("x").map((_, index) => (
        <StarBox key={index} />
      ))}
    </>
  );
}
