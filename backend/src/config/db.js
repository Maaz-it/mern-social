import mongoose from "mongoose";

const connectDB  = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB CONNECTED")
    } catch (error) {
        console.log("DB ERROR")
    }
}

export default connectDB