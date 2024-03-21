const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://DeepVyas:DeepVyas@hackhaven.hzl21hg.mongodb.net/HackHaven?retryWrites=true&w=majority&appName=HackHaven')
    }
    catch(err){
        console.log('Error:',err)
    }
}

module.exports = {connectDB,mongoose}