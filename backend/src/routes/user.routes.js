import express from "express"
import isAuth from "../middleware/isAuth.middleware.js"
import {editProfile, getCurrectUser, getMyprofile} from "../controllers/user.controller.js"
// import { uploadimage } from "../config/ImageStoage.js"
import { upload } from "../middleware/multer.js"
const  userRouter = express.Router()


userRouter.get("/current" , isAuth , getCurrectUser)


// userRouter.put("/edit-profile" , isAuth , uploadimage.single("file") , editProfile)

userRouter.put("/edit-profile" , isAuth , upload.single("file") , editProfile)

userRouter.get("/Me" , isAuth , getMyprofile)

export default userRouter