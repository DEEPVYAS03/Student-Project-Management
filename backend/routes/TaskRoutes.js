

const express = require('express');
const router = express.Router();


const { setUserTasks, getUserTasks} = require('../controllers/TaskController');


// Setting the user data who assigned the task

router.post('/savetask',setUserTasks)

// showing the task to user 

router.get('/showingTask/:userId',getUserTasks)

// router.post('/updatingtask',updatingTaskStatus)


module.exports = router;