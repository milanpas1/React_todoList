const mongoose= require('mongoose');

const {taskSchema}= require('../schemas/taskSchema')

const task= mongoose.model("task", taskSchema)

module.exports= {task};