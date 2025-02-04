import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import { Card } from "@mui/material";
import CreateAccount from "./../../components/Dashboard/CreateAccount";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import ShowAllUsers from "@/app/components/Dashboard/ShowAllUsers";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const UserDash = () => {
  return (
    <ProtectedRoute requiredRoles={["OFFICIAL"]}>
      <div>
        <div className="flex gap-4">
          {/* Main Content */}
          <div className="w-full p-4 my-4">
            <Card className="p-4">
              <CreateAccount />
              <ShowAllUsers />
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserDash;
