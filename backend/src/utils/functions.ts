import { Response } from "express";
export const handleErrorResponse = (err: any, res: Response): void => {
  if (err.statusCode) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to signup user",
      error: err,
    });
  }
};

export function createRandomString(length: number): string {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
