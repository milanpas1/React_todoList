import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import CompletedTasks from "./CompletedTasks";
import ToDoList from "./ToDoList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/allTodo"
              element={
                <ProtectedRoute>
                  <ToDoList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/completedTodo"
              element={
                <ProtectedRoute>
                  <CompletedTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
