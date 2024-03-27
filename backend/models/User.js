const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        required:true,
        type: String
    },
    college:{
        type: String
    },
    skills : {
        type: Array
    },
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    sentFriendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    tasks: [{
        taskId:{
            type:String,
        },
        title: {
            type: String,
        },
        description: {
            type: String
        },
        deadline: {
            type: Date,
        },
        assignedTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        assignedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        acceptAssign:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        completed: {
            type: Boolean,
            default: false
        }
    }]
})

module.exports = mongoose.model('User',UserSchema)
