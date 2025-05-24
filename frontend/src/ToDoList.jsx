import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import "./ToDoList.css";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function ToDoList() {
  let [task, setTask] = useState("");
  let [allTasks, setAllTasks] = useState([]);

  function fetchdata() {
    axios.get("http://localhost:3002/").then((res) => {
      setAllTasks(res.data);
    });
  }
  useEffect(fetchdata, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3002/", {
        todo: task,
      })
      .then(fetchdata);
    setTask("");
  }

  function handleChange(e) {
    setTask(e.target.value);
  }
  function handleDelete(id) {
    axios.delete(`http://localhost:3002/${id}/delete`
    )
      .then((response=>{
        console.log("delete response ", response.data)
        fetchdata()
      }))
    
  }
  return (
    <>
      <div className="row">
        <div className="col-6">
          <form action="" onSubmit={handleSubmit}>
            <TextField
              id="standard-basic"
              value={task}
              label="Enter Task"
              variant="standard"
              onChange={handleChange}
              className="mt-5 ms-5 "
            />
            <button
              type="submit"
              className="btn btn-success mt-5 ms-2"
              style={{
                height: "3.2rem",
              }}
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <ul className="allTasks mt-3">
            {allTasks.map((el) => (
              <div className="task-item" key={el._id}>
                <Checkbox onChange={() => handleDelete(el._id)} {...label} />
                <li>{el.todo}</li>
              </div>
            ))}
          </ul>
        </div>
        <div className="col-4"></div>
      </div>
    </>
  );
}

export default ToDoList;
