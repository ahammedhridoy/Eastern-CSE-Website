import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddAlumniTestimonial from "./../../components/Dashboard/AddAlumniTestimonial";
import ShowAlumniTestimonials from "@/app/components/Dashboard/ShowAlumniTestimonials";

const AlumniDash = () => {
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
          <AddAlumniTestimonial />
          <ShowAlumniTestimonials />
        </div>
      </div>
    </div>
  );
};

export default AlumniDash;
