import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import GetAllFaculty from "./../../components/Dashboard/GetAllFaculty";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddFaculty from "../../components/Dashboard/AddFaculty";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const FacultyDash = () => {
  return (
    <ProtectedRoute requiredRoles={["ADMIN"]}>
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
    </ProtectedRoute>
  );
};

export default FacultyDash;
