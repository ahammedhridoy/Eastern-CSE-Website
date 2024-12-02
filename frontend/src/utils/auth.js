// This function should check if the user is authenticated
export const isAuthenticated = () => {
  // You can check for a token in cookies or localStorage
  const token = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("token="));
  if (token) {
    return {
      // Return some user info if authenticated
      id: 1,
      role: "ADMIN", // Example role
    };
  }
  return null; // Return null if not authenticated
};

// This function should check if the user has the required role(s)
export const isAuthorized = (roles) => {
  const user = isAuthenticated();
  if (user && roles.includes(user.role)) {
    return true; // User is authorized
  }
  return false; // User is not authorized
};
