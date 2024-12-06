"use client";
import React from "react";
import Sidebar from "./Sidebar";
import BlogCard from "./BlogCard";

const DashboardComp = () => {
  return (
    <div className="min-h-screen">
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="mr-[250px] hidden lg:block">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="w-full">
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
