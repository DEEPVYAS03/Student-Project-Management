

const express = require('express');
const router = express.Router();


const { setUserTasks, getUserTasks, markTaskAsCompleted} = require('../controllers/TaskController');


// Setting the user data who assigned the task

router.post('/savetask',setUserTasks)

// showing the task to user 

router.get('/showingTask/:userId',getUserTasks)

router.put('/updatingtask',markTaskAsCompleted)

// router.post('/updatingtask',updatingTaskStatus)


module.exports = router;