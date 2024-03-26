const User = require('../models/User')
const mongoose = require('mongoose')


const setUserTasks = async (req, res) => {
    const { userId, taskId, title, deadline, assignedTo } = req.body;

    try {
       
        // Find the user who is assigning the task
        let assigningUser = await User.findById(userId);

        // assigningUser before pushing
        console.log('Assigning User:', assigningUser);

        // Loop through each assigned user ID
        for (const assignedUserId of assignedTo) {
            // Find the user to whom the task is assigned
            let assignedUser = await User.findById(assignedUserId);
            console.log('Assigned User:', assignedUser);

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
    const { userId } = req.params; // Assuming userId is passed in the request parameters

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
            if (task.assignedBy.length > 0) {
                // Extract task details and assignedBy user details
                assignedTasks.push({
                    taskName: task.title,
                    deadline: task.deadline,
                    assignedBy: task.assignedBy.map(assigner => ({
                        name: assigner.name,
                        email: assigner.email
                    }))
                });
            }
        }

        res.status(200).json({ user: { name: user.name, email: user.email }, assignedTasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};








// const gettingAssignedTask = async (req, res) => {
//     const { userId } = req.body;

//     try {
//         const assignedUser =await User.findById(userId);
//         console.log(assignedUser)
//         res.status(200).json({ tasks: assignedUser.tasks });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }


// const updatingTaskStatus = async (req, res) => {
//     const { userId, title } = req.body;

//     try {
//         // Fetch the user
//         const assignedUser = await User.findById(userId);
//         console.log(assignedUser);

//         // Find the task by taskId in the user's tasks array+
//         const taskToUpdate = assignedUser.tasks.find(task => task.title == title);

//         // Update the task status to completed
//         if (taskToUpdate) {
//             taskToUpdate.completed = true;
//             await assignedUser.save();
//             // Send the updated user object in the response
//             res.status(200).json({ message: "Task status updated successfully", user: assignedUser });
//         } else {
//             res.status(404).json({ message: "Task not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }





module.exports = {setUserTasks ,getUserTasks}