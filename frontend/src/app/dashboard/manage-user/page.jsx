import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import { Card } from "@mui/material";
import CreateAccount from "./../../components/Dashboard/CreateAccount";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import ShowAllUsers from "@/app/components/Dashboard/ShowAllUsers";

const UserDash = () => {
  return (
    <div>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="mr-[250px] hidden lg:block">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="w-full my-4">
          <Card className="p-4">
            <DashMobileMenu />
            <CreateAccount />
            <ShowAllUsers />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDash;
