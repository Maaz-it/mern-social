import User from "../models/user.models.js"

import { deleteImage , uploadimage } from "../config/ImageStoage.js";
import Post from "../models/post.models.js";

export const getCurrectUser = async (req, res) => {
  try {
    const user = req.user;   // coming from middleware

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `get current user ${error}` });
  }
};


// export const editProfile = async (req, res) => {
//   try {
//     console.log("req.userId:", req.userId);
//     console.log("req.user:", req.user);
//     console.log("body:", req.body);
//     console.log("file:", req.file);

//     const { name, userName, bio, profetion } = req.body;

//     // const user = await User.findById(req.userId).select("-password");

//     const user = req.User;

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     if (userName) {
//       const sameUser = await User.findOne({ userName });

//       if (
//         sameUser &&
//         sameUser._id.toString() !== req.userId.toString()
//       ) {
//         return res.status(400).json({ message: "Username already exists" });
//       }
//     }

//     if (req.file) {
//       const profileImage = await uploadimage(req.file);
//       user.profileImage = profileImage.url;
//     }

//     if (name) user.name = name;
//     if (userName) user.userName = userName;
//     if (bio) user.bio = bio;
//     if (profetion) user.profetion = profetion;

//     await user.save();

//     return res.status(200).json({
//       message: "User updated successfully",
//       user
//     });

//   } catch (error) {
//     console.log("edit profile error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };





export const editProfile = async (req, res) => {
  try {

    const { name, userName, bio, profetion } = req.body
    const user = req.user

    if (userName) {
      const sameUser = await User.findOne({ userName })

      if (sameUser && sameUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: "Username already exists" })
      }
    }

    if (req.file) {
      const profileImage = await uploadimage(req.file)
      user.profileImage = profileImage.url
    }

    if (name) user.name = name
    if (userName) user.userName = userName
    if (bio) user.bio = bio
    if (profetion) user.profetion = profetion

    await user.save()

    res.status(200).json({
      message: "User updated successfully",
      user
    })


    console.log(req.body)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyprofile  = async (req , res) =>{
  try {
    const user = await User.findById(req.user._id)
    .select("-password")
    .populate("post")
    if (!user) {
      return res.status(400).json({message: "User nOt found"})
    }

    res.status(200).json({
      message: "user find fetched",
      user
    })

  } catch (error) {
    console.log("Profile Errr" , error)
    res.status(500).json({message: error.message})
  }
}



// post controler 

export const CreatePost = async (req , res) =>{
  try {
    const {caption} = req.body;

    if (!req.file) {
      return res.status(400).json({
        message:"Media file requied"
      })
    }

    const upload = await uploadimage(req.file);

    let mediaType = "image"

    if (req.file.mimetype.startsWith("video")) {
      mediaType = "video";
    }

    const post = await Post.create({
      author: req.user._id,
      mediaType,
      media: upload.url,
      caption
    })

    req.user.post.push(post._id)
    await req.user.save()

    console.log(req.body)
console.log(req.file)
console.log(req.user)
 res.status(200).json({
  message:"Post created succufully",
  post
 })
  } catch (error) {
    console.log("create post issue" , error)
    res.status(500).json({
      message: "err post"
    })
  }
}

export const Getallpost  = async (req , res) =>{
  try {
    const posts = await Post.find()
    .populate("author" , "name profileImage")
    .sort({ createdAt: 1 })

    res.status(200).json({
      message: "POST FETCHED succulyy",
      posts
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}


export const LikePost = async (req , res) =>{
  try {
    const postId = req.params.postId
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "POST NPT FOUND"
      })
    }
    const alredyLike = post.likes.includes(userId)
    if (alredyLike) {
      // make it unlike 
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    }else{
      post.likes.push(userId)
    }
    await post.save()
    res.status(200).json({
      message: alredyLike ? "post Unlike" : "Post Like",
      totalPost : post.likes.length
    })
  } catch (error) {
      res.status(500).json({
      message: error.message
    });

  }
}


export const addcomment = async (req ,res) =>{

  try {
  const postId = req.params.postId
  const userId = req.user._id
  const {text} = req.body
const post = await Post.findById(postId)

if (!post) {
  return res.status(404).json({
    message: "Post not found"
  })
}

const newComment = {
  user: userId,
  text: text
}

post.comments.push(newComment);

await post.save()

res.status(200).json({message: "Comment added new one"})
  }catch (error) {
      res.status(500).json({
      message: error.message
    });
  }
}



export const  deleteComment = async (req , res) =>{

  try {

    const {postId , commentId} = req.params
    const userId = req.user._id

    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).json({message: "Post not found"})
    }
    const comment = post.comments.id(commentId);
    if (!comment) {
      res.status(404).json({message: "Comment  not found"})
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({
        message:"Not allow to delete the comment "
      })
    }

    comment.deleteOne();
    res.status(200).json({
      message: "Comment deleted succufully"
    })
  }catch (error) {
      res.status(500).json({
      message: error.message
    });
  }

}



export const followUnfloow = async (req , res) =>{
  try {
    const {userId} = req.params
  const curreuserId = req.user._id
  if (userId === curreuserId) {
    return res.status(402).json({message: "U cant follow ur ownID"})
  }

  const userToflow = await User.findById(userId)

  const currentUser = await User.findById(curreuserId)

  if (!userToflow || !currentUser) {
    return res.status(404).json({
      message:"User not found"
    })
  }


  const isfollowing = currentUser.following.includes(userId)

  if (isfollowing) {
    // unfloow code in if condition 
    currentUser.following.filter((id)=> id.toString() !== userId)
    userToflow.followers.filter((id)=> id.toString() !== currentUser.toString())
  

  await currentUser.save()
  await userToflow.save()

   return res.status(200).json({
    message:"user Unfollowd"
  })
  }else{
    // follow code in else condition c

    currentUser.following.push(userId)
    userToflow.followers.push(curreuserId)

    await currentUser.save()
    await userToflow.save()
    return res.status(200).json({
      message: "User Followed"
    }) 
  }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }

}
// export default {getCurrectUser , editProfile}