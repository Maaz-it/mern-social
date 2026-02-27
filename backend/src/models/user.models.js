import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userName: {
        unique: true,
        type: String,
        required: true
    },
    email:{
        unique: true,
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    followers:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    post:[
           {type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    saved :[
           {type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],

    reels:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: "Reels"
        }
    ],
    story: {
        type: mongoose.Schema.Types.ObjectId,
            ref: "Story"
    },
    resetOtp:{
        type: String,
    },
    otpExpires:{
        type: Date
    },
    isotpVerify:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})


const User = mongoose.model("User" , userSchema)

export default User;