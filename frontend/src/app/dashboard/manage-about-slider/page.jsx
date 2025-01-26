import React from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import DashMobileMenu from "../../components/Dashboard/DashMobileMenu";
import AddAboutSlider from "@/app/components/Dashboard/AddAboutSlider";
import ShowAboutSlider from "@/app/components/Dashboard/ShowAboutSlider";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const AboutSlider = () => {
  return (
    <ProtectedRoute requiredRoles={["EDITOR", "ADMIN"]}>
      <div>
        <div className="flex gap-4">
          {/* Main Content */}
          <div className="w-full my-4">
            <AddAboutSlider />
            <ShowAboutSlider />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AboutSlider;
