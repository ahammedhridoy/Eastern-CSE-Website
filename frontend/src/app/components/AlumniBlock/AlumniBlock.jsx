import React from "react";
import Separator from "../Separator/Separator";
import AlumniCarousel from "../AlumniCarousel/AlumniCarousel";
const AlumniBlock = () => {
  return (
    <div className="my-10">
      {/* Headline */}
      <h1 className="text-5xl  text-[var(--black-color)] font-bold text-center">
        What Our Alumni Say
      </h1>

      <Separator width="w-20" position="justify-center" />

      {/* Cards */}
      <AlumniCarousel />
    </div>
  );
};

export default AlumniBlock;
