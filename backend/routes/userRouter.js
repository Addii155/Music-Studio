import express from "express"
const authRouter= express.Router();
import authCtrl  from "../controllers/auth_controller.js"
import verifyJwt from "../middlewares/auth.middlesware.js";

authRouter.post("/signup", authCtrl.singUp);
authRouter.post("/login",authCtrl.signIn);
authRouter.post("/verifyemail",authCtrl.verifyEmail);
authRouter.get("/signout",verifyJwt,authCtrl.signOut);
authRouter.post('/forgetpassword',authCtrl.forgetPassword);
authRouter.post('/resetpassword',authCtrl.resetPassword);


export default authRouter