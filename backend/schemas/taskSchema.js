const mongoose= require('mongoose');

const taskSchema= mongoose.Schema({
    todo:String,
})

module.exports= {taskSchema}