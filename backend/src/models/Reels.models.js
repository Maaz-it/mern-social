import mongoose from "mongoose";

const reelsSchema = new  mongoose.Schema({
     author: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:"User",
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
        comments:[
          {
              type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          }
        ]
}, {timestamps: true})

const Reels = mongoose.model("Reels" , reelsSchema)
export default Reels