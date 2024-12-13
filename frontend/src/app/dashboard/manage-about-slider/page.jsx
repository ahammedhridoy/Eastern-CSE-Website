import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import DashMobileMenu from "../../components/Dashboard/DashMobileMenu";
import AddAboutSlider from "@/app/components/Dashboard/AddAboutSlider";
import ShowAboutSlider from "@/app/components/Dashboard/ShowAboutSlider";

const AboutSlider = () => {
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
          <AddAboutSlider />
          <ShowAboutSlider />
        </div>
      </div>
    </div>
  );
};

export default AboutSlider;
