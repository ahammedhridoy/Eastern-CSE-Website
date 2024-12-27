"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation hook
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, requiredRole }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const user = Cookies.get("user");

    if (!user || !accessToken) {
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } else {
      // Check role if required
      if (requiredRole && user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.role !== requiredRole) {
          router.push("/admin");
        } else {
          setIsAuthorized(true);
        }
      } else {
        setIsAuthorized(true);
      }
    }
    setLoading(false); // Set loading to false after checking
  }, [router, requiredRole]);

  if (loading) return <div>Loading...</div>; // Show loading state while checking authentication

  if (!isAuthorized) return null; // Don't render anything if not authorized

  return <>{children}</>; // Render children if authorized
};

export default ProtectedRoute;
