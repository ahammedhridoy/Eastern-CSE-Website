import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import { Card } from "@mui/material";

const ManageAccDash = () => {
  return (
    <div>
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="mr-[250px]">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="w-full my-4">
          <Card>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            provident aspernatur alias quod et tenetur, exercitationem ipsam at
            voluptatibus error eius temporibus quis reprehenderit earum ea iusto
            atque nulla repellat?
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageAccDash;
