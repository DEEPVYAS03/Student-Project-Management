

const express = require('express');
const router = express.Router();


const {gettingAssignedTask, updatingTaskStatus, setUserTasks} = require('../controllers/TaskController')

// Setting the user data who assigned the task

router.post('/savetask',setUserTasks)

// showing the task to user 

router.get('/showingTask',gettingAssignedTask)

router.post('/updatingtask',updatingTaskStatus)


module.exports = router;