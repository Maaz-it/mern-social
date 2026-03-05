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




// export default {getCurrectUser , editProfile}