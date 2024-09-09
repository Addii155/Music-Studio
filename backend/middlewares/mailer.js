import nodemailer from "nodemailer"

const sendmail= async(email,otp,subject) => {
    const auth = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "aditysgoyal11@gmail.com",
        pass: "xwqs tits laiq iktg",
      }  
    });
    const recevier={
        from:process.env.HOST_MAIL,
        to:email,
        subject: subject,

        html: ` <p style="font-size: 16px;"> Hi there ,</p>
          <p style="font-size: 16px;>Thank you for using our service. To verify your identity, we have sent you a 
           one-time password (OTP).Please find your OTP below:
          </p>
          <p style="font-size: 25px; letter-spacing: 2px; color: lightgreen;" ><strong> OTP : ${otp}
          </strong><p>
          <p style="font-size: 16px;>Please do not share this OTP with anyone, as it is used to verify your identity.
          </p>
          <p style="font-size: 16px;>If you did not request this OTP, please ignore this email.Thank you for 
           choosing our service.
          </p>
          <p style="font-size: 16px;>Best regards,</p>
          <p style="font-size: 16px;>Team iLearn</p>  `,
      };
        
    
    auth.sendMail(recevier,( error,emailResponse) => {
        if(error)
        {
            throw error;
        }
        // console.log("success",emailResponse)
    
    })
    
}
export default sendmail