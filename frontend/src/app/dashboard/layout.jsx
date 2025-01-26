import Sidebar from "../components/Dashboard/Sidebar";
import DashMobileMenu from "../components/Dashboard/DashMobileMenu";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute requiredRoles={["EDITOR", "ADMIN"]}>
      <div className="flex h-screen ">
        {/* Sidebar */}
        <aside className="hidden text-white bg-gray-800 w-72 lg:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-2 overflow-auto bg-gray-100">
          <DashMobileMenu />
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
