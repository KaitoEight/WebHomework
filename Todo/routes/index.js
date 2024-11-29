var express = require('express');
var router = express.Router();
const TodoModel = require("../models/todo.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
  TodoModel.find({}).then(function(tasks) {
    res.render("index", {tasks: tasks});
  })
});

router.get('/login', async function(req, res, next) {
  TodoModel.find({}).then(function(tasks) {
    res.render("login");
  })
});

router.post('/create', async function(req, res, next) {
  let {title, user} = req.body;
  let newTodo = await TodoModel({title: title, user: user, isDone: 0})
  newTodo.save()
    .then(()=>{
      console.log("New task is created")
    })
    .catch(err=>console.log(err))
})

router.post('/update-status', async (req, res) => {
  const taskId = req.body.taskId;

  try {
    // Find the task by ID
    const task = await TodoModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task status
    task.isDone = !task.isDone;

    // Save the updated task to the database
    await task.save();

    // Respond with the updated task status
    res.json({ status: task.isDone, taskId: task._id });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
