import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Alert, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
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

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      setLoading(false);
      return;
    }

    const { confirmPassword, ...registerData } = formData;
    const result = await register(registerData);

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
          <h1 className="auth-title">Join TaskMaster!</h1>
          <p className="auth-subtitle">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <Alert severity="error" className="auth-alert">
              {error}
            </Alert>
          )}

          <div className="name-fields">
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
              className="auth-input half-width"
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#667eea",
                },
              }}
            />

            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
              className="auth-input half-width"
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#667eea",
                },
              }}
            />
          </div>

          <TextField
            fullWidth
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            className="auth-input"
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover fieldset": {
                  borderColor: "#667eea",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#667eea",
              },
            }}
          />

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
                "&:hover fieldset": {
                  borderColor: "#667eea",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#667eea",
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
                "&:hover fieldset": {
                  borderColor: "#667eea",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#667eea",
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            variant="outlined"
            className="auth-input"
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover fieldset": {
                  borderColor: "#667eea",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#667eea",
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
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8, #6b46c1)",
              },
              "&:disabled": {
                background: "#ccc",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="auth-links">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
