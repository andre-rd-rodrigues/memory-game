import { Navigate } from "react-router-dom";
import { token } from "utils/authUtils";

const ProtectedRoute = ({ children }) => {
  if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
