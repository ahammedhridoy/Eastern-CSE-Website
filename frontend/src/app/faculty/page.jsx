import FacultyCard from "@/app/components/FacultyCard/FacultyCard";
import Separator from "@/app/components/Separator/Separator";
import React from "react";

export const metadata = {
  title: "Faculty",
  description: "",
};

function Faculty() {
  return (
    <div className="faculty">
      {/* Banner */}
      <div className="relative banner">
        {/* <Image
          src={"/images/faculty/faculty_banner.jpg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
          alt="Banner"
        /> */}
        <div
          style={{ width: "100%", height: "300px" }}
          className="object-cover bg-[#2D3B50] "
        ></div>
        <h1 className="absolute z-10 text-3xl font-bold text-white -translate-x-1/2 -translate-y-1/2 lg:text-5xl top-1/2 left-1/2">
          FACULTY
        </h1>

        <div className="absolute top-0 w-full h-full bg-black opacity-50"></div>
      </div>

      {/* content */}
      <div className="container p-10">
        {/* Headline */}
        <h1 className=" text-3xl  text-[var(--black-color)] font-bold text-center">
          Our Faculties
        </h1>
        <Separator />
        {/* Cards */}
        <FacultyCard />
      </div>
    </div>
  );
}

export default Faculty;
