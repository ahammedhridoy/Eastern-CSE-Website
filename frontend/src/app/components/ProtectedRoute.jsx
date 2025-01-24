"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation hook
import Cookies from "js-cookie";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const user = Cookies.get("user");

    if (!user || !accessToken) {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }

    const parsedUser = JSON.parse(user);

    if (requiredRoles && requiredRoles.length > 0) {
      // Check if the user's role matches any of the required roles
      if (!requiredRoles.includes(parsedUser?.role)) {
        router.push("/admin");
      } else {
        setIsAuthorized(true);
      }
    } else {
      setIsAuthorized(true);
    }

    setLoading(false);
  }, [router, requiredRoles]);

  if (loading) return <LoadingSpinner />;

  if (!isAuthorized) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
