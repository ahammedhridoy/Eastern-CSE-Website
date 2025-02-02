import React from "react";
import Separator from "../Separator/Separator";
import ProgramCard from "../ProgramCard/ProgramCard";
const ProgramBlock = () => {
  return (
    <div className="my-10 event">
      <h1 className="lg:text-5xl text-3xl text-[var(--black-color)] font-bold text-center">
        Our Programs
      </h1>
      <Separator width="w-20" position="justify-center" />
      {/* Cards */}
      <ProgramCard />
    </div>
  );
};

export default ProgramBlock;
