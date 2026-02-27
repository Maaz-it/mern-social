import express from "express"
import isAuth from "../middleware/isAuth.middleware.js"
import getCurrectUser from "../controllers/user.controller.js"


const  userRouter = express.Router()


userRouter.get("/current" , isAuth , getCurrectUser)
export default userRouter