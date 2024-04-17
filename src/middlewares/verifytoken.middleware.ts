import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).send({
        message: "No token provided",
      });
    }

    const checkToken = jwt.verify(token, process.env.JWT_SECRET!);

    if (!checkToken) {
      return res.status(403).send({
        message: "Failed to authenticate jwt",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};
