import FacultyDetailsCard from "@/app/components/FacultyDetailsCard/FacultyDetailsCard";
import React from "react";

export const metadata = {
  title: "Faculty Details",
  description: "",
};

const SingleFaculty = () => {
  return (
    <div className="container p-10 single-faculty">
      <FacultyDetailsCard />
    </div>
  );
};

export default SingleFaculty;
