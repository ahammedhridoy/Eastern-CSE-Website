import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddAlumniTestimonial from "./../../components/Dashboard/AddAlumniTestimonial";
import ShowAlumniTestimonials from "@/app/components/Dashboard/ShowAlumniTestimonials";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const AlumniDash = () => {
  return (
    <ProtectedRoute requiredRoles={["ADMIN"]}>
      <div>
        <div className="flex gap-4">
          {/* Main Content */}
          <div className="w-full my-4">
            <AddAlumniTestimonial />
            <ShowAlumniTestimonials />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AlumniDash;
