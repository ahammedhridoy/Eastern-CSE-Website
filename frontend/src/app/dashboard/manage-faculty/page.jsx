import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";

const FacultyDash = () => {
  return (
    <div>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="mr-[250px]">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="w-full my-4">
          <h1>Faculty</h1>
        </div>
      </div>
    </div>
  );
};

export default FacultyDash;
