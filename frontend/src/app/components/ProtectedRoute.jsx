"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation hook
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import axios from "axios";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        // Send a request to the backend to verify the user
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.status === 200 && response?.data?.verified) {
          // User is verified, allow access
          setLoading(false);
        } else {
          // User is not verified, redirect to login
          router.replace("/");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        router.replace("/");
      }
    };

    verifyUser();
  }, [router]);

  if (loading) return <LoadingSpinner />;

  return <>{children}</>;
};

export default ProtectedRoute;
