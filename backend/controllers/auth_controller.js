import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import authSchema from "../utils/validators.js";
import Otp from "../models/otp.model.js";
import User from "../models/user.model.js";
import sendmail from "../middlewares/mailer.js";
import TryCatch from "../utils/TryCatch.js";
import axios from "axios";

const authCtrl = {
  singUp: async (req, res, next) => {
    try {
      const data = await authSchema.validateAsync(req.body);
      const password = data.password;
      const email = data.email;
      const username = data.username;
      const hashedPassword = await bcryptjs.hash(password, 8);
      const otp = Math.floor(1000 + Math.random() * 9000);
      const exitOtp = await Otp.findOne({ email });
      if (exitOtp) {
        exitOtp.updateOne({
          otp,
          createdAt: Date.now(),
        });
      } else {
        let OTP = Otp.create({
          email,
          otp,
        });
      }
      const exitUser = await User.findOne({ username });
      if (exitUser) {
        if (!exitUser.verify) {
          exitUser.updateOne({
            username: username,
            email: email,
            password: hashedPassword,
          });
        } else {
          res.status(200).json({
            success: false,
            message: "User with this email already exit",
          });
        }
      } else {
        const exitusername = await User.findOne({ username });
        if (exitusername) {
          res.status(200).json({
            success: false,
            message: "User with this username already exit",
          });
        }
        const userCreated = await User.create({
          username,
          email,
          password: hashedPassword,
        });
      }
      sendmail(data.email, otp, "Email verification Otp");
      res.status(201).json({
        success: true,
        message: "User user signup successfully",
        data: {
          username: username,
          email: email,
        },
      });
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  },
  
  googleSingUp: TryCatch(async (req, res) => {
    const { googleToken } = req.body;
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${googleToken}`;
    const { data } = await axios.get(url);
    if (!data)
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    const exitUser = await User.findOne({ email: data.email });
    if (exitUser) {
      const payload = {
        id: exitUser._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      return res
        .cookie("token", token, {
          expiresIn: "2d",
          httpOnly: true,
          secure: true,
        })
        .status(201)
        .json({
          success: true,
          message: "user signin successfully",
          user: exitUser,
          token: token,
        });
    }
    const userCreated = await User.create({
      username: data.name,
      email: data.email,
      avatar: data.picture,
    });
    const payload = {
      id: userCreated._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    return res
      .cookie("token", token, {
        expiresIn: "2d",
        httpOnly: true,
        secure: true,
      })
      .status(201)
      .json({
        success: true,
        message: "user signup successfully",
        user: userCreated,
        token: token,
      });
  }),
  verifyEmail: async (req, res, next) => {
    try {
      const { email, otpEnter } = req.body;
      let OTP = await Otp.findOne({ email });
      if (!OTP)
        return res.status(400).json({
          success: false,
          message: "Email not exit in Otp",
        });
      // console.log(OTP)
      // console.log(otpEnter)
      if (otpEnter != OTP?.otp) {
        return res.status(401).json({
          success: false,
          message: "Invalid Otp",
        });
      }
      const updateUser = await User.findOneAndUpdate(
        { email },
        { verify: true }
      );
      if (updateUser.verify == true) Otp.deleteOne({ email });
      res.json({ success: true, message: "Email is verified" });
    } catch (error) {
      return res.status(401).json({
        message: "error In verification",
      });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(email)
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "error In signIn",
        });
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      // console.log(isMatch)
      if (!isMatch) {
        return res.status(401).json({
          message: "Password not matched",
        });
      }
      // if(user.verify==false)
      // {
      //     return res.status(401).json({
      //         message:"email not verify"
      //     })
      // }
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
        })
        .status(201)
        .json({
          success: true,
          message: "User signIn sucessfully",
          user: user,
          token: token,
        });
    } catch (error) {
      return res.status(401).json({
        message: "error In signIn",
      });
    }
  },
  resendOtp: async (req, res, next) => {
    try {
      const { email } = req.body;
      const exitEmail = await User.findOne({ email });
      if (!exitEmail) {
        return res.status(400).json({
          message: "Email not exit",
        });
      }
      const otp = Math.floor(1000 + Math.random() * 9000);

      if (exitOtp) {
        const currentTime = Date.now();
        const timeDifference =
          currentTime - new Date(exitOtp.createdAt).getTime();
        if (timeDifference >= 60000) {
          await Otp.findOneAndUpdate({
            $set: {
              otp,
              createdAt: currentTime,
            },
          });
        } else {
          return res.status(400).json({
            message: "60 seconds not completed",
          });
        }
      } else {
        const newOtp = await Otp.create({
          email,
          otp,
        });
      }
      sendmail(email, otp, "Resend Otp");

      res.json({
        success: true,
        message: "New OTP has been sent to your registered email",
      });
    } catch (error) {
      return res.status(400).json({
        message: "err in resend email",
      });
    }
  },
  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.json({
          success: false,
          message: "Email doest not registered",
        });
      }
      const otp = Math.floor(1000 + Math.random() * 9000);
      const exsitOtp = await Otp.findOne({ email });
      if (exsitOtp) {
        await Otp.findOneAndUpdate({
          otp,
          createdAt: Date.now(),
        }); 
      } else {
        await Otp.create({
          email,
          otp,
        });
      }
      sendmail(email, otp, "Reset Password");
      res.json({
        success: true,
        message: "otp is send to your registered email",
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Error in forget Password",
      });
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { email, password, otp } = req.body;
      const dbOtp = await Otp.findOne({ email });
      if (!dbOtp) {
        return res.status(401).json({
          message: "Invalid Otp or Email Id",
        });
      }

      if (dbOtp.otp != otp) {
        return res.status(401).json({
          message: "Invalid Otp",
        });
      }
      const hashedPassword = await bcryptjs.hash(password, 10);
      const updateUser = await User.findOneAndUpdate(
        { email },
        {
          password: hashedPassword,
        }
      );
      if (!updateUser) {
        return res.status(401).json({
          message: "User not found",
        });
      }
      await Otp.findOneAndDelete({ email });
      res.json({
        success: true,
        message: "Password has been reset successfully",
      });
    } catch (error) {
      return res.status(401).json({
        message: "error In resetPassword",
      });
    }
  },
  signOut: async (req, res) => {
    try {
      return res.clearCookie("token").status(201).json({
        message: "signOut Successfully",
      });
    } catch (error) {
      return res.status(401).json({
        message: "error In signOut",
      });
    }
  },
};

export default authCtrl;
