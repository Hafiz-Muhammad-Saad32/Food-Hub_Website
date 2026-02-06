import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole"); // "admin" or null

  if (!userRole) {
    // Not logged in → go to admin login page
    return <Navigate to="/admin" replace />;
  }

  if (userRole !== "admin") {
    // Logged in but not admin → go to home page
    return <Navigate to="/" replace />;
  }

  // User is admin → allow access
  return children;
};

export default AdminRoute;
