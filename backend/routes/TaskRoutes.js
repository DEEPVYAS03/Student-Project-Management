

const express = require('express');
const router = express.Router();


const {setAssignedUser,gettingAssignedTask, updatingTaskStatus} = require('../controllers/TaskController')

// Setting the user data who assigned the task

router.post('/assignedby',setAssignedUser)

// showing the task to user 

router.get('/showingTask',gettingAssignedTask)

router.post('/updatingtask',updatingTaskStatus)


module.exports = router;