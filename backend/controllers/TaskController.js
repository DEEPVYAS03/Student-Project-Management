const User = require('../models/User')
const mongoose = require('mongoose')


const setAssignedUser = async (req, res) => {
    const { userId, title, deadline, assignedTo } = req.body;

    try {
        let assignedUser = await User.findById(userId);
        console.log(assignedUser);

        // Update user's data
        assignedUser.tasks.push({
            title: title,
            deadline: deadline,
            assignedTo: assignedTo
        });

        // Save the updated user data
        await assignedUser.save();

        res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}



const gettingAssignedTask = async (req, res) => {
    const { userId } = req.body;

    try {
        const assignedUser =await User.findById(userId);
        console.log(assignedUser)
        res.status(200).json({ tasks: assignedUser.tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const updatingTaskStatus = async (req, res) => {
    const { userId, title } = req.body;

    try {
        // Fetch the user
        const assignedUser = await User.findById(userId);
        console.log(assignedUser);

        // Find the task by taskId in the user's tasks array+
        const taskToUpdate = assignedUser.tasks.find(task => task.title == title);

        // Update the task status to completed
        if (taskToUpdate) {
            taskToUpdate.completed = true;
            await assignedUser.save();
            // Send the updated user object in the response
            res.status(200).json({ message: "Task status updated successfully", user: assignedUser });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}





module.exports = {setAssignedUser ,gettingAssignedTask,updatingTaskStatus}