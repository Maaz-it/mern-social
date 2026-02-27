
import sendMail from "../config/Mail.js";
import gentoken from "../config/token.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";


export const signup = async (req , res) =>{
    try {
        const {name , email , userName , password} = req.body;

        const findemail = await User.findOne({email})
        if (findemail)  {return res.status(400).json({message: "Email alredy register"})}

         const findeusername = await User.findOne({userName})
        if (findeusername)  {return res.status(400).json({message: "Email alredy register"})}


        const hashpassowrd = await bcrypt.hash(password , 10)

        const user = await User.create({
            name , 
            userName,
            email,
            password : hashpassowrd 
        })

        const token = await gentoken(user._id)

        res.status(201).json({
            message: "Signup Successfull",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                userName: user.userName
            }
        })
    } catch (error) {
        console.log("Signup error" , error.message),
        res.status(500).json({message: "Signup failde" , error: error.message})
    }
}


export const  login  = async ( req, res) =>{ 

    try {
        const {email , userName , password} = req.body;

        const user = await User.findOne({
            $or: [{email} , {userName}]
        })

        if (!user) {
            return res.status(401).json({message: "User not exist"})
        }


        // compared password 
        const ismatched = await bcrypt.compare(password , user.password)
        if (!ismatched) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = await gentoken(user._id);
        res.status(200).json({message: "User login succfully",
            token,
            id: user._id,
            email: user.email,
            userName: user.userName
        })
    } catch (error) {
        console.log("Login error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
    }

}


export const  setOtp = async (req , res) =>{

    try {
        const {email} = req.body;
        const user = await  User.findOne({email})
        if (!user) {
            return res.status(401).json({message: "Email not found"})
        }

        const otp = Math.floor(Math.random() * 9000).toString()

        user.resetOtp = otp,
        user.otpExpires = Date.now() + 5 * 60 * 1000;
user.isotpVerify = false;
await user.save()
await sendMail(email , otp)

return res.status(200).json({
    message: "OTP SEnd succylu on ur mail"
})

    }catch (error) {
  console.log("Error coming:", error.message);
  return res.status(500).json({ message: "Something went wrong" });
}
}

export const verifyotp = async ( req , res) =>{

    try {
        const {otp} = req.body;

        const user = await User.findOne({resetOtp: otp})

        if (!user || user.otpExpires < Date.now()) {
            return res.status(400).json({message: "Invalid otp man"})
        }

        user.isotpVerify = true,
        await user.save()
        return res.status(200).json({message: "Otp verify succult"})

    } catch (error) {
                return res.status(500).json({ message: "Something went wrong" });
    }
}


export const resetPassword =  async (req , res) =>{

    try {
        const { password} = req.body;
        const user = await User.findOne({isotpVerify : true })

        if (!user || !user.isotpVerify) {
            return res.status(400).json({message:"otp verification requided"})
        }

        const hashpassword = await bcrypt.hash(password , 10)
        user.password = hashpassword
        user.isotpVerify = false;

        await user.save()
return res.status(201).json({message:"password reset succufully"})
     }catch (error) {
  console.log("Error coming:", error.message);
  return res.status(500).json({ message: "Something went wrong" });
}
 }