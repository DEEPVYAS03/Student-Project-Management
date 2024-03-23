const express = require('express');
const router = express.Router();

const multer = require("multer");


const {postMessage, getUserDetails ,getMessages,upload} = require('../controllers/Messagecontroller')

router.post("/messages", upload.single("imageFile"),postMessage );

router.get('/user/:userId',getUserDetails)

router.get("/messages/:senderId/:recepientId",getMessages);



  
module.exports = router;
