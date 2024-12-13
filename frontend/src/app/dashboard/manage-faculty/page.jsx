import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import GetAllFaculty from "./../../components/Dashboard/GetAllFaculty";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddFaculty from "@/app/components/Dashboard/AddFaculty";

const FacultyDash = () => {
  return (
    <div>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="mr-[300px] hidden lg:block">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="w-full my-4">
          <DashMobileMenu />
          {/* Add Faculty */}
          <AddFaculty />
          {/* Display Faculty */}
          <GetAllFaculty />
        </div>
      </div>
    </div>
  );
};

export default FacultyDash;
