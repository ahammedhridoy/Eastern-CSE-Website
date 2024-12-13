import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import ShowAccount from "@/app/components/Dashboard/ShowAccount";
import { Card } from "@mui/material";

const ManageAccDash = () => {
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
          <div>
            <Card className="min-h-screen p-4">
              <ShowAccount />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccDash;
