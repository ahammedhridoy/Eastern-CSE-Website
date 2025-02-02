import { Typography } from "@mui/material";
import BlogCard from "../components/Dashboard/BlogCard";
import ProtectedRoute from "../components/ProtectedRoute";
import Separator from "../components/Separator/Separator";

export const metadata = {
  title: "Dashboard",
  description: "",
};

const Dashboard = () => {
  return (
    <ProtectedRoute requiredRoles={["EDITOR", "ADMIN"]}>
      <div className="pl-4">
        <Typography gutterBottom variant="h5" component="div" className="my-4 ">
          All Blogs
        </Typography>
        <Separator position="justify-start" />
      </div>
      <div className="w-full">
        <BlogCard />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
