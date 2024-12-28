import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddSlider from "./../../components/Dashboard/AddSlider";
import ShowAllSlider from "@/app/components/Dashboard/ShowAllSlider";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const SliderDash = () => {
  return (
    <ProtectedRoute requiredRoles={["EDITOR", "ADMIN"]}>
      <div>
        <div className="flex gap-4">
          {/* Sidebar */}
          <div className="mr-[300px] hidden lg:block">
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
    </ProtectedRoute>
  );
};

export default SliderDash;
