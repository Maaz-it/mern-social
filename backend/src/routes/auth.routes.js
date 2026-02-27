import express from "express"
import { login, resetPassword, setOtp, signup, verifyotp } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup" , signup)

authRouter.post("/sendotp" , setOtp)

authRouter.post("/verifyotp" , verifyotp)

authRouter.post("/resetpassword" ,resetPassword)


authRouter.post("/login" , login)

export default authRouter