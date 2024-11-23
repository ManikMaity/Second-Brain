import express from "express";
import { signinController, signupController } from "../controllers/user.controller";
import zodValidate from "../middlewares/zodValidate";
import userSchema, { userSigninSchema } from "../validations/user.validation";
const userRouter = express.Router();

userRouter.post("/signup", zodValidate(userSchema), signupController);
userRouter.post("/signin", zodValidate(userSigninSchema), signinController);

export default userRouter;