import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/allTodo");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Sign in to your TaskMaster account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <Alert severity="error" className="auth-alert">
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            type="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            className="auth-input"
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#f1f5f9",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "#60a5fa",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#60a5fa",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#cbd5e1",
                "&.Mui-focused": {
                  color: "#60a5fa",
                },
              },
              "& .MuiOutlinedInput-input": {
                color: "#f1f5f9",
                "&::placeholder": {
                  color: "#94a3b8",
                  opacity: 1,
                },
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            className="auth-input"
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#f1f5f9",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "#60a5fa",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#60a5fa",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#cbd5e1",
                "&.Mui-focused": {
                  color: "#60a5fa",
                },
              },
              "& .MuiOutlinedInput-input": {
                color: "#f1f5f9",
                "&::placeholder": {
                  color: "#94a3b8",
                  opacity: 1,
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="auth-button"
            disabled={loading}
            sx={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              color: "white",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              },
              "&:disabled": {
                background: "rgba(100, 116, 139, 0.6)",
                color: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="auth-links">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
