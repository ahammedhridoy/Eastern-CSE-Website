"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyUser } from "@/hooks/verifyUser";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        // Safely parse localStorage items
        const accessToken = localStorage.getItem("accessToken");
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        // Check if user is logged in
        if (!user || !accessToken) {
          router.replace("/login");
          setLoading(false);
          return;
        }

        // Verify user token
        const isVerified = await verifyUser(accessToken);

        console.log("isVerified: " + isVerified);

        // Check role-based authorization if required
        if (requiredRoles.length > 0) {
          const hasRequiredRole = requiredRoles.includes(user?.role);

          if (!hasRequiredRole) {
            router.replace("/login");
            setLoading(false);
            return;
          }
        }

        setIsAuthorized(isVerified);
        setLoading(false);
      } catch (error) {
        console.error("Authorization check failed:", error);
        router.replace("/login");
        setLoading(false);
      }
    };

    // Only run check if in browser environment
    if (typeof window !== "undefined") {
      checkAuthorization();
    }
  }, [router, requiredRoles]);

  // Render loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Render children if authorized
  return isAuthorized ? children : null;
};

export default ProtectedRoute;
