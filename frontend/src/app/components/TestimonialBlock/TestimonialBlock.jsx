import React from "react";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import Separator from "../Separator/Separator";
const TestimonialBlock = () => {
  return (
    <div className="my-10">
      {/* Headline */}
      <h1 className="text-5xl  text-[var(--black-color)] font-bold text-center">
        What Our Teacher Say
      </h1>

      <Separator width="w-20" position="justify-center" />

      {/* Cards */}
      <TestimonialCard />
    </div>
  );
};

export default TestimonialBlock;
