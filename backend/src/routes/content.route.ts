import express from "express";
import { createContentController, deleteContentController, getContentController } from "../controllers/content.controller";
import { authenticate } from "../middlewares/auth";
const contentRouter = express.Router();

contentRouter.get("/", authenticate, getContentController);
contentRouter.post("/", createContentController);
contentRouter.delete("/", deleteContentController);

export default contentRouter;