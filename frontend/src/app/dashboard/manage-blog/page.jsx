import React from "react";
import Sidebar from "./../../components/Dashboard/Sidebar";
import BlogCard from "./../../components/Dashboard/BlogCard";
import CreateBlog from "./../../components/Dashboard/CreateBlog";

const BlogDash = () => {
  return (
    <div className="min-h-screen">
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="mr-[250px]">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="my-4">
          {/* Create Blog */}
          <div>
            <CreateBlog />
          </div>
          {/* Blogs */}
          <div className="grid w-full grid-cols-1 gap-5 my-4 md:grid-cols-2 lg:grid-cols-4 place-content-center place-items-center">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDash;
