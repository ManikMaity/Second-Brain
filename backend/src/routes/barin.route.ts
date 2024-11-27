import {Router} from "express";
import { brainShareController, getBrainController, isLinkExistController } from "../controllers/content.controller";
import { authenticate } from "../middlewares/auth";
import zodValidate from "../middlewares/zodValidate";
import { linkShareSchema } from "../validations/content.validation";
const brainRouter = Router();

brainRouter.post("/share", zodValidate(linkShareSchema), authenticate, brainShareController);
brainRouter.get("/exits", authenticate, isLinkExistController);
brainRouter.get("/profile/:shareLink", getBrainController);


export default brainRouter;