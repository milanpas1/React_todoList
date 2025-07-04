import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import "./ToDoList.css";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function ToDoList() {
  let [task, setTask] = useState("");
  let [allTasks, setAllTasks] = useState([]);

  function fetchdata() {
    axios.get("http://localhost:3002/allTodo").then((res) => {
      setAllTasks(res.data);
    });
  }
  useEffect(fetchdata, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim() === "") return;

    axios
      .post("http://localhost:3002/allTodo", {
        todo: task,
        isDone: false,
      })
      .then(fetchdata);
    setTask("");
  }

  function handleChange(e) {
    setTask(e.target.value);
  }

  function handleDone(id) {
    axios.put(`http://localhost:3002/allTodo/${id}/done`).then((response) => {
      console.log("Done task ", response.data);
      fetchdata();
    });
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3002/allTodo/${id}/delete`)
      .then((response) => {
        console.log("Delete task ", response.data);
        fetchdata();
      })
      .catch((e) => {
        console.error("Error deleting task", e);
      });
  }

  const activeTasks = allTasks.filter((task) => task.isDone === false);

  return (
    <div className="todo-container">
      {/* Header Section */}
      <div className="todo-header">
        <h1 className="todo-title">Task Manager</h1>
        <p className="todo-subtitle">
          Stay organized and boost your productivity
        </p>
      </div>

      {/* Task Input Section */}
      <div className="task-input-section">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <TextField
              className="task-input"
              id="task-input"
              value={task}
              label="What needs to be done?"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
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
            <button
              type="submit"
              className="btn btn-primary add-button"
              disabled={task.trim() === ""}
            >
              ✨ Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Tasks Section */}
      <div className="tasks-section">
        <div className="tasks-container">
          <div className="tasks-header">
            <h2 className="tasks-title">📝 Active Tasks</h2>
            <span className="tasks-count">{activeTasks.length}</span>
          </div>

          {activeTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎯</div>
              <div className="empty-state-text">No active tasks!</div>
              <div className="empty-state-subtext">
                Add a task above to get started
              </div>
            </div>
          ) : (
            <ul className="allTasks">
              {activeTasks.map((el) => (
                <div key={el._id} className="task-item">
                  <Checkbox
                    onChange={() => handleDone(el._id)}
                    {...label}
                    className="task-checkbox"
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(102, 126, 234, 0.04)",
                      },
                    }}
                  />
                  <li>{el.todo}</li>
                  <button
                    onClick={() => handleDelete(el._id)}
                    type="button"
                    className="btn btn-danger delete-button"
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
