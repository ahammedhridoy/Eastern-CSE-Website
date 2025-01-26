"use client";
import React from "react";
import Sidebar from "./Sidebar";
import BlogCard from "./BlogCard";
import { Typography } from "@mui/material";
import Separator from "../Separator/Separator";

const DashboardComp = () => {
  return (
    <div className="min-h-screen">
      <div className="flex gap-4">
        {/* Main Content */}
        <div className="w-full">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="my-4"
          >
            All Blogs
          </Typography>
          <Separator position="justify-start" />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
