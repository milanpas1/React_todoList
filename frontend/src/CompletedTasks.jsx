import { useState, useEffect } from "react";
import "./ToDoList.css";
import "./CompletedTask.css";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function CompletedTasks() {
  let [allTasks, setAllTasks] = useState([]);

  function fetchdata() {
    axios.get("http://localhost:3002/completedTodo").then((res) => {
      setAllTasks(res.data);
    });
  }

  useEffect(() => {
    fetchdata();
  }, []);

  function handleDone(id) {
    axios
      .put(`http://localhost:3002/completedTodo/${id}/undone`)
      .then((response) => {
        console.log("Undo task ", response.data);
        fetchdata();
      });
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3002/completedTodo/${id}/delete`)
      .then((response) => {
        console.log("Delete task ", response.data);
        fetchdata();
      })
      .catch((e) => {
        console.error("Error deleting task", e);
      });
  }

  const completedTasks = allTasks.filter((task) => task.isDone === true);

  return (
    <div className="completed-container">
      {/* Header Section */}
      <div className="completed-header">
        <h1 className="completed-title">Completed Tasks</h1>
        <p className="completed-subtitle">
          Great job! Here are your accomplishments
        </p>
      </div>

      {/* Stats Section */}
      {completedTasks.length > 0 && (
        <div className="stats-section">
          <div className="stats-title">🎉 Tasks Accomplished</div>
          <div className="stats-number">{completedTasks.length}</div>
          <div className="stats-label">Way to go! Keep up the great work!</div>
        </div>
      )}

      {/* Completed Tasks Section */}
      <div className="completed-tasks-section">
        <div className="completed-tasks-container">
          <div className="completed-tasks-header">
            <h2 className="completed-tasks-title">✅ Completed Tasks</h2>
            <span className="completed-tasks-count">
              {completedTasks.length}
            </span>
          </div>

          {completedTasks.length === 0 ? (
            <div className="completed-empty-state">
              <div className="completed-empty-state-icon">📋</div>
              <div className="completed-empty-state-text">
                No completed tasks yet!
              </div>
              <div className="completed-empty-state-subtext">
                Complete some tasks to see them here
              </div>
            </div>
          ) : (
            <ul className="allTasks">
              {completedTasks.map((el) => (
                <div key={el._id} className="completed-task-item">
                  <Checkbox
                    onChange={() => handleDone(el._id)}
                    {...label}
                    checked={true}
                    className="completed-task-checkbox"
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(40, 167, 69, 0.04)",
                      },
                    }}
                  />
                  <li>{el.todo}</li>
                  <div>
                    {/* <button
                      onClick={() => handleDone(el._id)}
                      type="button"
                      className="btn btn-warning undo-button"
                      title="Mark as incomplete"
                    >
                      ↶ Undo
                    </button> */}
                    <button
                      onClick={() => handleDelete(el._id)}
                      type="button"
                      className="btn btn-danger delete-button-completed"
                      title="Delete permanently"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompletedTasks;
