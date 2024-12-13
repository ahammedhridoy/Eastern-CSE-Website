"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation hook
import { GlobalContext } from "@/context/GlobalContext";
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setTimeout(() => router.push("/admin"), 1000);
    } else if (requiredRole && user?.role !== requiredRole) {
      router.push("/admin");
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
