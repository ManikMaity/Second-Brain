import express from "express";
import { createContentController, deleteContentController, getContentController } from "../controllers/content.controller";
import { authenticate } from "../middlewares/auth";
import zodValidate from "../middlewares/zodValidate";
import { createContentSchema } from "../validations/content.validation";
const contentRouter = express.Router();

contentRouter.get("/", authenticate, getContentController);
contentRouter.post("/", zodValidate(createContentSchema), authenticate, createContentController);
contentRouter.delete("/", authenticate, deleteContentController);

export default contentRouter;