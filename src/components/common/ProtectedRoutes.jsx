// src/components/common/ProtectedRoutes.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// import { useAuth } from "../Context/useAuh";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
