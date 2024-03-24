const User = require('../models/User')
const mongoose = require('mongoose')


// const setAssignedUser = async (req, res) => {
//     const { userId, taskId, title, deadline, assignedTo } = req.body;

//     try {
//         // Find the user who is assigning the task
//         let assigningUser = await User.findById(userId);

//         // Loop through each assigned user ID
//         for (const assignedUserId of assignedTo) {
//             // Find the user to whom the task is assigned
//             let assignedUser = await User.findById(assignedUserId);

//             // Update assigned user's data
//             assignedUser.tasks.push({
//                 taskId: taskId,
//                 title: title,
//                 deadline: deadline,
//                 assignedBy: assigningUser._id, // Store the ID of the user who assigned the task
//                 assignedTo: assignedUser._id // Update assignedTo for the user who is assigning the task
//             });

//             // Save the updated assigned user data
//             await assignedUser.save();
//         }

//         res.status(200).json({ message: "User data updated successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }


const setUserTasks = async (req, res) => {
    const { userId, taskId, title, deadline, assignedTo } = req.body;

    try {
        console.log('User ID:', userId);
        console.log(typeof(userId))

        console.log('Task ID:', taskId);
        console.log('Title:', title);
        console.log('Deadline:', deadline);
        console.log('Assigned To:', assignedTo);

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





module.exports = {setUserTasks ,gettingAssignedTask,updatingTaskStatus}