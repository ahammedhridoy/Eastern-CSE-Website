import DashboardComp from "../components/Dashboard/DashboardComp";
import DashMobileMenu from "../components/Dashboard/DashMobileMenu";
import ProtectedRoute from "../components/ProtectedRoute";

export const metadata = {
  title: "Dashboard",
  description: "",
};

const Dashboard = () => {
  return (
    <ProtectedRoute requiredRoles={["EDITOR", "ADMIN"]}>
      <div className="my-2">
        <DashMobileMenu />
        <DashboardComp />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
