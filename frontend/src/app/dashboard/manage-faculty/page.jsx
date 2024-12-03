import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import AddFaculty from "../../components/Dashboard/AddFaculty";
import GetAllFaculty from "./../../components/Dashboard/GetAllFaculty";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";

const FacultyDash = () => {
  return (
    <div>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="mr-[250px] hidden lg:block">
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
