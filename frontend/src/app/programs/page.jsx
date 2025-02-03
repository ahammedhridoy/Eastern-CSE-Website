import EventCard from "@/app/components/EventCard/EventCard";
import Separator from "@/app/components/Separator/Separator";
import Image from "next/image";
import React from "react";
import ProgramCard from "../components/ProgramCard/ProgramCard";

export const metadata = {
  title: "Programs",
  description: "",
};

function Programs() {
  return (
    <div className="faculty">
      {/* Banner */}
      <div className="relative banner">
        <div
          style={{ width: "100%", height: "300px" }}
          className="object-cover bg-[#2D3B50] "
        ></div>
        <h1 className="absolute z-10 text-3xl font-bold text-white -translate-x-1/2 -translate-y-1/2 lg:text-5xl top-1/2 left-1/2">
          PROGRAMS
        </h1>
        <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
      </div>

      {/* content */}
      <div className="container p-10">
        {/* Headline */}
        <h1 className=" text-3xl text-[var(--black-color)] font-bold text-center">
          Our Programs
        </h1>

        <Separator />

        {/* Cards */}
        <ProgramCard />
      </div>
    </div>
  );
}

export default Programs;
