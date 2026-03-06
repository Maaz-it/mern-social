import express from "express"
import isAuth from "../middleware/isAuth.middleware.js"
import {addcomment, CreatePost, deleteComment, editProfile, followUnfloow, Getallpost, getCurrectUser, getMyprofile, LikePost} from "../controllers/user.controller.js"
// import { uploadimage } from "../config/ImageStoage.js"
import { upload } from "../middleware/multer.js"
const  userRouter = express.Router()


userRouter.get("/current" , isAuth , getCurrectUser)


// userRouter.put("/edit-profile" , isAuth , uploadimage.single("file") , editProfile)


userRouter.put("/edit-profile" , isAuth , upload.single("image") , editProfile)


userRouter.get("/Me" , isAuth , getMyprofile)


userRouter.post("/create-post" , isAuth , upload.single("media") , CreatePost)


userRouter.post("/feed" , isAuth ,  Getallpost)


userRouter.post("/Likes/:postId" , isAuth ,  LikePost)


userRouter.post("/comment/:postId" , isAuth ,  addcomment)


userRouter.post("/comment/:postId/:commentId" , isAuth ,  deleteComment)


userRouter.put("/follow/:userId" , isAuth , followUnfloow)



export default userRouter