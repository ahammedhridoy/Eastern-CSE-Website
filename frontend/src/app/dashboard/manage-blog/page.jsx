import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import BlogCard from "./../../components/Dashboard/BlogCard";
import DashMobileMenu from "./../../components/Dashboard/DashMobileMenu";
import AddBlog from "./../../components/Dashboard/AddBlog";
import { Card, Typography } from "@mui/material";
import Separator from "@/app/components/Separator/Separator";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const BlogDash = () => {
  return (
    <ProtectedRoute requiredRoles={["EDITOR", "ADMIN"]}>
      <div className="min-h-screen">
        <div className="flex gap-4">
          {/* Main Content */}
          <div className="w-full my-4">
            {/* Create Blog */}
            <div>
              <AddBlog />
            </div>
            {/* Blogs */}
            <Card className="w-full p-2 mt-5">
              <Typography gutterBottom variant="h5" component="div">
                All Blogs
              </Typography>
              <Separator position="justify-start" />
              <BlogCard />
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BlogDash;
