import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import { Card } from "@mui/material";
import CreateAccount from "./../../components/Dashboard/CreateAccount";

const UserDash = () => {
  return (
    <div>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="mr-[250px]">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="w-full my-4">
          <Card className="p-4">
            <CreateAccount />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDash;
