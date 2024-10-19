import React from "react";
import Separator from "../Separator/Separator";
import TestimonialCarousel from "../TestimonialCarousel/TestimonialCarousel";
const TestimonialBlock = () => {
  return (
    <div className="my-10">
      {/* Headline */}
      <h1 className="text-5xl  text-[var(--black-color)] font-bold text-center">
        What Our Teacher Say
      </h1>

      <Separator width="w-20" position="justify-center" />

      {/* Cards */}
      <TestimonialCarousel />
    </div>
  );
};

export default TestimonialBlock;
