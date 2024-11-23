import express from "express";
import { signinController, signupController } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/signin", signinController);

export default userRouter;