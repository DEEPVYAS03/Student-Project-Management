const express = require('express');
const app = express();
const cors = require('cors');


// importing db
const {connectDB} = require('./db');
connectDB()


// importing routes
const userRoutes = require('./routes/UserRoutes')

const messageRoutes = require('./routes/messageRoutes')


// middlewares
app.use(cors())
app.use(express.json())



// using routes
//userRouter
app.use('/api',userRoutes)
app.use('/api',messageRoutes)




// listening to server
app.listen(5000,()=>{
    console.log('Server is running on port 5000')
})