import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddAlumniTestimonial from "./../../components/Dashboard/AddAlumniTestimonial";

const AlumniDash = () => {
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
          <AddAlumniTestimonial />
        </div>
      </div>
    </div>
  );
};

export default AlumniDash;
