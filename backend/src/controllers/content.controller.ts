import e, { Request, Response } from "express";
import { RequestUserWithUser } from "../middlewares/auth";
import { createRandomString, handleErrorResponse } from "../utils/functions";
import { CreateContentType } from "../validations/content.validation";
import ContentModel from "../schemas/content.schema";
import { LinkModel } from "../schemas/link.schema";
import UserModel from "../schemas/user.schema";

export async function getContentController(
  req: RequestUserWithUser,
  res: Response
) {
  try {
    //@ts-ignore
    const userId = req.user?._id;
    const dataType = req.query.type as
      | "link"
      | "tweet"
      | "video"
      | "doc"
      | "all";

    let userContents;

    if (!dataType || dataType === "all") {
      userContents = await ContentModel.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("user", "username");
    } else {
      userContents = await ContentModel.find({ user: userId, type: dataType })
        .sort({ createdAt: -1 })
        .populate("user", "username");
    }

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
    const { title, link, tags, type }: CreateContentType = req.body;
    //@ts-ignore
    const userId = req.user?._id;
    const content = await ContentModel.create({
      title,
      type,
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

export async function brainShareController(
  req: RequestUserWithUser,
  res: Response
) {
  try {
    // @ts-ignore
    const userId = req.user?._id;
    const share = req.body.share;
    if (share) {
      const share = await LinkModel.create({
        userId: userId,
        hash: createRandomString(15),
      });
      res.status(200).json({
        message: "Link shared successfully",
        success: true,
        data: share,
      });
    } else {
      await LinkModel.findOneAndDelete({ userId: userId });
      res.status(200).json({
        message: "Link deleted successfully",
        success: true,
      });
    }
  } catch (err: any) {
    if (err.code == 11000) {
      res.status(409).json({
        success: false,
        message: "Link already exists",
        error: err.message,
      });
    } else {
      handleErrorResponse(err, res);
    }
  }
}

export async function getBrainController(req: Request, res: Response) {
  try {
    const shareLink = req.params.shareLink;
    const dataType = req.query.type as
      | "link"
      | "tweet"
      | "video"
      | "doc"
      | "all";
    const link = await LinkModel.findOne({ hash: shareLink });
    if (!link) {
      throw {
        statusCode: 404,
        message: "Brain not found",
      };
    }

    const brainUser = await UserModel.findById(link.userId);

    if (!brainUser) {
      throw {
        statusCode: 404,
        message: "User not found",
      };
    }

    const { password, ...creator } = brainUser.toObject();

    let content;
    if (!dataType || dataType === "all") {
      content = await ContentModel.find({ user: link.userId }).populate(
        "user",
        "username email"
      );
    } else {
      content = await ContentModel.find({
        user: link.userId,
        type: dataType,
      }).populate("user", "username email");
    }

    if (!content) {
      throw {
        statusCode: 404,
        message: "Content not found",
      };
    }

    res.json({
      message: "Content fetched successfully",
      success: true,
      data: {
        creator,
        content,
      },
    });
  } catch (err) {
    console.log(err);
    handleErrorResponse(err, res);
  }
}

export async function isLinkExistController(
  req: RequestUserWithUser,
  res: Response
) {
  try {
    //@ts-ignore
    const userId = req.user?._id;
    const link = await LinkModel.findOne({ userId: userId });
    const isExist = link ? true : false;

    res.status(200).json({
      success: true,
      message: "Link fetched successfully",
      data: {
        exist: isExist,
        link,
      },
    });
  } catch (err: any) {
    console.log(err);
    handleErrorResponse(err, res);
  }
}
