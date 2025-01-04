import React from "react";
import FacultyCard from "@/app/components/FacultyCard/FacultyCard";
import Separator from "../Separator/Separator";
const FacultyBlock = () => {
  return (
    <div className="my-10">
      {/* Headline */}
      <h1 className="lg:text-5xl text-3xl  text-[var(--black-color)] font-bold text-center">
        Our Faculties
      </h1>

      <Separator width="w-20" position="justify-center" />

      {/* Cards */}
      <FacultyCard />
    </div>
  );
};

export default FacultyBlock;
