import express from "express";
import {signupController, loginController } from "../controller/Auth.controller.js";
import { validateLogin, validateSignup } from "../model/User.model.js";
const router = express.Router();

router.post("/signup", validateSignup, signupController);
router.post("/login", validateLogin, loginController);
const userRouter = router;


export default userRouter;