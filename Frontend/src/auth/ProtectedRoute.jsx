import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
}
