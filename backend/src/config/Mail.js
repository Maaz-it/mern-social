import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "maazkh2700@gmail.com",
    pass: "zstx tiyx jxhb gkli",
  },
});


const sendMail = async ( to , otp) =>{
    transporter.sendMail({
        from: "maazkh2700@gmail.com",
        to,
        subject: "Reset Password",
        html: `<p> Your otp password resist is ${otp} </br>
        it would be expire in 5 mins 
         </p>`
    })
}

export  default sendMail

