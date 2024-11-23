import express from "express";
import { createContentController, deleteContentController, getContentController } from "../controllers/content.controller";
const contentRouter = express.Router();

contentRouter.get("/", getContentController);
contentRouter.post("/", createContentController);
contentRouter.delete("/", deleteContentController);

export default contentRouter;