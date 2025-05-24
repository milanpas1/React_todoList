const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const { task } = require("./model/taskModel");

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
app.get("/addtask", async (req, res) => {
  let initTask = [
    {
      todo: "do this",
    },
    {
      todo: "do that",
    },
    {
      todo: "do nothing",
    },
  ];

  await task.insertMany(initTask);
  res.send("db saved");
}); 

app.get('/',async(req,res)=>{
let alltasks= await task.find({})

res.json(alltasks)

})

app.post('/',async(req,res)=>{
let newTask= new task({
todo:req.body.todo,
})
await newTask.save();
res.status(201).json(newTask)
})

app.delete('/:id/delete',async(req,res)=>{
const deletedTask= await task.findByIdAndDelete(req.params.id)
res.status(201).json({message:`${deletedTask}`})
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
