let mongoose = require('mongoose');

async function ConnectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully.");
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports=ConnectDB;