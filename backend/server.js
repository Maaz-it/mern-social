import express from "express"

import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import cors from "cors"
import authRouter from "./src/routes/auth.routes.js"
import userRouter from "./src/routes/user.routes.js"
dotenv.config()

const app  = express ()

const port = 4000


app.use(express.json())

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use("/api/auth" , authRouter)


app.use("/api/user" , userRouter)


// app.use("/api/post" , userRouter)


app.listen(port , ()=>{
connectDB()
    console.log("server starterd now time for frontend")
})