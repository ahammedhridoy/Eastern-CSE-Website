import React from "react";
import { Card, Typography } from "@mui/material";
import Separator from "@/app/components/Separator/Separator";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import AddProgram from "@/app/components/Dashboard/AddProgram";
import ProgramCardDash from "@/app/components/Dashboard/ProgramCardDash";

const ManageProgram = () => {
  return (
    <ProtectedRoute requiredRoles={["OFFICIAL"]}>
      <div className="min-h-screen">
        <div className="flex gap-4">
          {/* Main Content */}
          <div className="w-full my-4">
            {/* Create Blog */}
            <div>
              <AddProgram />
            </div>
            {/* Blogs */}
            <Card className="w-full p-2 mt-5">
              <Typography gutterBottom variant="h5" component="div">
                All Programs
              </Typography>
              <Separator position="justify-start" />
              <ProgramCardDash />
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ManageProgram;
