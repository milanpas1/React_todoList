import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <CircularProgress size={60} sx={{ color: "white" }} />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
