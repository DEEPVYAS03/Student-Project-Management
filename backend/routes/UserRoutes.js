const express = require('express');
const router = express.Router();

// importing controllers

// importing user controller
const {createUser,loginUser, getAllUsers, sendFriendRequest, getAllRequest, acceptFriendRequest, getAllFriends,fetchUser} =require('../controllers/Usercontroller')



// creating routes

// User login signup routes
router.post('/createUser',createUser)
router.post('/loginUser',loginUser)


// get all users
router.get('/users',getAllUsers)


// send friend request
router.post('/send-friend-request', sendFriendRequest);


// get all friend requests
router.get('/get-all-friend-requests/:userId', getAllRequest);


// accept friend request
router.post('/accept-friend-request', acceptFriendRequest);


// get all friends
router.get('/get-all-friends/:userId', getAllFriends);

// get User
router.get('/user/:userId',fetchUser)

// exporting routes as single router
module.exports = router;