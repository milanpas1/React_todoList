const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: false,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

module.exports = { taskSchema };
