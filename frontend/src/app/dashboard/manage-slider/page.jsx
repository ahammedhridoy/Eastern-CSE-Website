import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddSlider from "./../../components/Dashboard/AddSlider";
import ShowAllSlider from "@/app/components/Dashboard/ShowAllSlider";

const SliderDash = () => {
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
          <AddSlider />
          <ShowAllSlider />
        </div>
      </div>
    </div>
  );
};

export default SliderDash;
