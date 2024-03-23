const User = require('../models/User')
const mongoose = require('mongoose')


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register user controller
const createUser = async (req, res) => {
    // hashing password
    const salt = await bcrypt.genSalt(10)
    const secPassword = await bcrypt.hash(req.body.password, salt)

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            college: req.body.college,
            skills: req.body.skills
        })
        await user.save()
        res.status(201).send({ success: true })
    }
    catch (err) {
        res.status(404).send({ success: false, error: 'User already exists' })
    }
}

// login user controller
const loginUser = async (req, res) => {

    // find user by email
    const user = await User.findOne({
        email: req.body.email
    });
    console.log('User:', user)

    // compare password founded user password with entered password
    let pwdCompare = await bcrypt.compare(req.body.password, user.password)


    console.log('Password compare:', pwdCompare)

    if (!user) {
        return res.status(404).send({ success: false, error: 'Invalid credentials' })
    }
    if (!pwdCompare) {
        return res.status(404).send({ success: false, error: 'Invalid credentials' })
    }
    // jwt token
    const data = {
        user: {
            id: user._id
        }
    }
    const jwtSecret = 'DEEPVYAS03';
    // signing using jwt secret key
    const authToken = jwt.sign(data, jwtSecret)


    // authtoken needs to be stored in local storage
    return res.status(200).send({ user, success: true, authToken })


}

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users) { return res.status(404).send({ success: false, error: 'No users found' }) }
    res.status(200).send(users)
}



const sendFriendRequest = async (req, res) => {
    try {
        console.log('req.user:', req.body);
        const { userId, receiverId } = req.body
        // userId is the sender's id
        // receiverId is the receiver's id

        console.log('SendersId:', userId);
        console.log('ReceiverId:', receiverId);

        // Update sender's sentFriendRequests
        await User.findByIdAndUpdate(userId, { $addToSet: { sentFriendRequests: receiverId } });

        // Update receiver's friendRequests
        await User.findByIdAndUpdate(receiverId, { $addToSet: { friendRequests: userId  } });

        res.status(200).json({ message: 'Friend request sent successfully' });
        console.log('Friend request sent successfully');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


 
const getAllRequest = async (req, res) => {
    try {
        const userId = req.params.userId;
        const stringId = userId.toString();
       const user = await User.findById(stringId);
        console.log('User:', user);
        const userFriend =  user.friendRequests[0];
        console.log('UserFriend:', userFriend);
        const friend = await User.findById(userFriend);
        console.log('Friend:', friend);
        res.status(200).json({ friend });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const fetchUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const stringId = userId.toString();
        const user = await User.findById(stringId);
        console.log('User:', user);
        res.status(200).json({ _id:stringId,name: user.name ,email: user.email });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const acceptFriendRequest = async (req, res) => {
    try {
        const { userId, senderId } = req.body;
        console.log('UserId:', userId);
        console.log('SenderId:', senderId);
        // Update receiver's friend list
        await User.findByIdAndUpdate(userId, {
            $addToSet: { friends: senderId },
            $pull: { friendRequests: senderId }
        });

        // Update sender's friend list
        await User.findByIdAndUpdate(senderId, {
            $addToSet: { friends: userId },
            $pull: { sentFriendRequests: userId }
        });

        res.status(200).json({ message: 'Friend request accepted successfully' });
        console.log('Friend request accepted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllFriends = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate(
            "friends",
            "name email"
          );
        const friends = user.friends;
        console.log('Friends:', friends);
        res.status(200).json({ friends });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// export both controllers individually to use in routes
module.exports = { createUser, loginUser,fetchUser, getAllUsers , sendFriendRequest ,getAllRequest ,acceptFriendRequest , getAllFriends}