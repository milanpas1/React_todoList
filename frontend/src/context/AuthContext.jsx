import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Configure axios to include token in requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const response = await axios.get(
            "http://localhost:3002/api/auth/profile"
          );
          if (response.data.success) {
            setUser(response.data.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        const { token: newToken, user: userData } = response.data;
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/register",
        userData
      );

      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem("token", newToken);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(
        "http://localhost:3002/api/auth/profile",
        profileData
      );

      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Profile update failed",
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
