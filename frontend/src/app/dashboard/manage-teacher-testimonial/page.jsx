import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddTeacherTestimonial from "./../../components/Dashboard/AddTeacherTestimonial";
import ShowTeacherTestimonials from "@/app/components/Dashboard/ShowTeacherTestimonials";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const TeacherTestimonialDash = () => {
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
            <AddTeacherTestimonial />
            <ShowTeacherTestimonials />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TeacherTestimonialDash;
