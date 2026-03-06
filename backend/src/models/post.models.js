import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type:  mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    mediaType:{
        type: String,
        enum:["image" , "video"],
        required: true
    },
    media:{
        type: String,
        required: true
    },
    caption:{
        type: String,
        require: true
    },
    likes:[
      {
          type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      text: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]

}, {timestamps: true})


const Post = mongoose.model("Post" , postSchema)
export default Post           