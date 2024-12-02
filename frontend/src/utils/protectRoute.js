import { useRouter } from "next/router";
import { isAuthenticated, isAuthorized } from "./auth";

const protectRoute = (roles = []) => {
  const router = useRouter();
  const user = isAuthenticated();

  // Check if user is authenticated
  if (!user) {
    router.push("/login");
    return null; // Don't render anything if not authenticated
  }

  // Check if user has the required role
  if (roles.length > 0 && !isAuthorized(roles)) {
    router.push("/403"); // Redirect to a 403 page if unauthorized
    return null; // Don't render anything if unauthorized
  }

  return true; // Render the page if authenticated and authorized
};

export default protectRoute;
