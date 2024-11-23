import { Request, Response } from "express";
import { RequestUserWithUser } from "../middlewares/auth";
import { handleErrorResponse } from "../utils/functions";
import { CreateContentType } from "../validations/content.validation";
import ContentModel from "../schemas/content.schema";

export async function getContentController(
  req: RequestUserWithUser,
  res: Response
) {
  try {
    //@ts-ignore
    const userId = req.user?._id;

    const userContents = await ContentModel.find({ user: userId }).populate(
      "user",
      "username"
    );
    res.status(200).json({
      success: true,
      message: "Contents fetched successfully",
      data: userContents,
    });
  } catch (err: any) {
    handleErrorResponse(err, res);
  }
}

export async function createContentController(
  req: RequestUserWithUser,
  res: Response
) {
  try {
    const { title, link, tags }: CreateContentType = req.body;
    //@ts-ignore
    const userId = req.user?._id;
    const content = await ContentModel.create({
      title,
      link,
      tags: tags || [],
      user: userId,
    });
    res.json({
      success: true,
      message: "Content created successfully",
      data: content,
    });
  } catch (err: any) {
    handleErrorResponse(err, res);
  }
}

export async function deleteContentController(req: Request, res: Response) {
  try {
    //@ts-ignore
    const userId = req.user?._id;
    const { contentId } = req.body;

    // content exist
    const content = await ContentModel.findById(contentId);
    if (!content) {
      throw {
        statusCode: 404,
        message: "Content not found with this id",
      };
    }
    // check if content is created by user
    if (content.user.toString() !== userId.toString()) {
      throw {
        statusCode: 401,
        message: "You are not authorized to delete this content",
      };
    }

    await ContentModel.findByIdAndDelete(contentId);
    res.status(200).json({
      message: "Content deleted successfully",
      success: true,
    });
  } catch (err: any) {
    handleErrorResponse(err, res);
  }
}
