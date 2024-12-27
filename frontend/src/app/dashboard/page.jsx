import DashboardComp from "../components/Dashboard/DashboardComp";
import DashMobileMenu from "../components/Dashboard/DashMobileMenu";
import ProtectedRoute from "../components/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="">
        <DashMobileMenu />
        <DashboardComp />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
