const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const { task } = require("./model/taskModel");
const { User } = require("./model/userModel");
const { authenticateToken } = require("./middleware/auth");
const authRoutes = require("./routes/auth");

const uri = process.env.mongo_url;
const PORT = process.env.PORT || 3002;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database initialized");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(bodyParser.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Protected task routes - require authentication
app.get("/allTodo", authenticateToken, async (req, res) => {
  try {
    const alltasks = await task.find({ userId: req.user._id });
    res.json(alltasks);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
});

app.post("/allTodo", authenticateToken, async (req, res) => {
  try {
    const newTask = new task({
      todo: req.body.todo,
      isDone: req.body.isDone || false,
      userId: req.user._id,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating task" });
  }
});

app.get("/completedTodo", authenticateToken, async (req, res) => {
  try {
    const alltasks = await task.find({
      isDone: true,
      userId: req.user._id,
    });
    res.json(alltasks);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching completed tasks" });
  }
});

app.put("/allTodo/:id/done", authenticateToken, async (req, res) => {
  try {
    const completedTask = await task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        isDone: true,
        completedAt: new Date(),
      },
      { new: true }
    );

    if (!completedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, task: completedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error completing task" });
  }
});

app.delete("/completedTodo/:id/delete", authenticateToken, async (req, res) => {
  try {
    const deleteTask = await task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleteTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting task" });
  }
});

app.put("/completedTodo/:id/undone", authenticateToken, async (req, res) => {
  try {
    const completedTask = await task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        isDone: false,
        completedAt: null,
      },
      { new: true }
    );

    if (!completedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, task: completedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating task" });
  }
});

app.delete("/allTodo/:id/delete", authenticateToken, async (req, res) => {
  try {
    const deleteTask = await task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleteTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting task" });
  }
});

// User stats endpoint
app.get("/user/stats", authenticateToken, async (req, res) => {
  try {
    const totalTasks = await task.countDocuments({ userId: req.user._id });
    const completedTasks = await task.countDocuments({
      userId: req.user._id,
      isDone: true,
    });
    const activeTasks = totalTasks - completedTasks;

    res.json({
      success: true,
      stats: {
        totalTasks,
        completedTasks,
        activeTasks,
        completionRate:
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching stats" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
