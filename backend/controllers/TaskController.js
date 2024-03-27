const User = require('../models/User');
const mongoose = require('mongoose');

const setUserTasks = async (req, res) => {
    const { userId, taskId, title, deadline, assignedTo } = req.body;

    try {
        // Find the user who is assigning the task
        let assigningUser = await User.findById(userId);

        // Loop through each assigned user ID
        for (const assignedUserId of assignedTo) {
            // Find the user to whom the task is assigned
            let assignedUser = await User.findById(assignedUserId);

            // Ensure tasks array is initialized
            if (!assignedUser.tasks) assignedUser.tasks = [];

            // Update assigned user's data
            assignedUser.tasks.push({
                taskId: taskId,
                title: title,
                deadline: deadline,
                assignedBy: assigningUser._id, // Store the ID of the user who assigned the task
            });

            // Save the updated assigned user data
            await assignedUser.save();
        }

        // Ensure assignedTo array is initialized
        if (!assigningUser.assignedTo) assigningUser.assignedTo = [];

        // Push the entire assignedTo array to assigning user's assignedTo
        assigningUser.assignedTo.push(...assignedTo);

        // Save the updated assigning user data
        await assigningUser.save();

        res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUserTasks = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID and populate the tasks with assignedBy user details
        const user = await User.findById(userId).populate({
            path: 'tasks',
            populate: {
                path: 'assignedBy',
                select: 'name email'
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Array to store assigned tasks with details
        const assignedTasks = [];

        // Iterate through user's tasks
        for (const task of user.tasks) {
            // If task is assigned by someone
            if (task.assignedBy) {
                // Extract task details and assignedBy user details
                assignedTasks.push({
                    taskId: task.taskId,
                    taskName: task.title,
                    deadline: task.deadline.toISOString().split('T')[0],
                    completed: task.completed,
                    assignedBy: {
                        id: task.assignedBy._id,
                        name: task.assignedBy.name,
                        email: task.assignedBy.email
                    }
                });
            }
        }

        res.status(200).json({ user: { id: user._id, name: user.name, email: user.email }, assignedTasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const markTaskAsCompleted = async (req, res) => {
    const { userId, taskId } = req.body;
    console.log(userId, taskId);

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the task by taskId
        const taskIndex = user.tasks.findIndex(task => task.taskId === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Mark the task as completed
        user.tasks[taskIndex].completed = true;

        await user.save();

        res.status(200).json({ message: "Task marked as completed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { setUserTasks, getUserTasks, markTaskAsCompleted };
