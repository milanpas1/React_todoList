import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={isAuthenticated ? "/allTodo" : "/login"}
        >
          TaskMaster
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/allTodo" ? "active" : ""
                    }`}
                    to="/allTodo"
                  >
                    📝 Active Tasks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/completedTodo" ? "active" : ""
                    }`}
                    to="/completedTodo"
                  >
                    ✅ Completed
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/profile" ? "active" : ""
                    }`}
                    to="/profile"
                  >
                    👤 {user?.firstName || "Account"}
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  to="/login"
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/register" ? "active" : ""
                  }`}
                  to="/register"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
