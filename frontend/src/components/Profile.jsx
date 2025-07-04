import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
      });
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:3002/user/stats");
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await updateProfile(formData);

    if (result.success) {
      setMessage(result.message);
      setMessageType("success");
    } else {
      setMessage(result.message);
      setMessageType("error");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">My Account</h1>
        <p className="profile-subtitle">
          Manage your profile and view your task statistics
        </p>
      </div>

      <div className="profile-content">
        {/* User Info Card */}
        <Card className="profile-card user-info-card">
          <CardContent>
            <div className="user-info-header">
              <Avatar
                className="user-avatar"
                sx={{
                  width: 80,
                  height: 80,
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  fontSize: "2rem",
                  fontWeight: 600,
                }}
              >
                {getInitials(user.firstName, user.lastName)}
              </Avatar>
              <div className="user-details">
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
                <p className="user-email">{user.email}</p>
                <p className="user-username">@{user.username}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        {stats && (
          <Card className="profile-card stats-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                📊 Your Task Statistics
              </Typography>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{stats.totalTasks}</div>
                  <div className="stat-label">Total Tasks</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.completedTasks}</div>
                  <div className="stat-label">Completed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.activeTasks}</div>
                  <div className="stat-label">Active</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.completionRate}%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Profile Card */}
        <Card className="profile-card edit-profile-card">
          <CardContent>
            <Typography variant="h6" className="card-title">
              ✏️ Edit Profile
            </Typography>

            <form onSubmit={handleSubmit} className="profile-form">
              {message && (
                <Alert
                  severity={messageType}
                  className="profile-alert"
                  sx={{ borderRadius: "12px" }}
                >
                  {message}
                </Alert>
              )}

              <div className="form-row">
                <TextField
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                  className="profile-input"
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
                  className="profile-input"
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
                className="profile-input"
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
                name="email"
                label="Email Address"
                value={user.email}
                variant="outlined"
                className="profile-input"
                disabled
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />

              <div className="profile-buttons">
                <Button
                  type="submit"
                  variant="contained"
                  className="update-button"
                  disabled={loading}
                  sx={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    borderRadius: "12px",
                    padding: "12px 24px",
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
                    "Update Profile"
                  )}
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  className="logout-button"
                  sx={{
                    borderColor: "#ff6b6b",
                    color: "#ff6b6b",
                    borderRadius: "12px",
                    padding: "12px 24px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#ee5a52",
                      backgroundColor: "rgba(255, 107, 107, 0.04)",
                    },
                  }}
                >
                  Sign Out
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
