import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey: any = process.env.SECRET_KEY;

export function verifyToken(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const authHeaders = req.header("Authorization");

  if (!authHeaders) {
    res.status(400).json({
      message: "User Not Found."
    });
  }

  const token = authHeaders && (authHeaders as string).split(" ")[1];

  jwt.verify(
    token,
    "dHPaQEEL]Y]5X;HOAC[kF1DNF(9eC4vs",
    (err: any, decoded: any) => {
      console.log("err :", err);

      if (err) {
        if (err.name === "TokenExpiredError") {

          return res.status(401).json({
            message: "Token Expire."
          });
        } else {
          return res.status(200).json({
            message: "Invalid User."
          });
        }
      }

      req.userId = decoded?.userId;
      next();
    }
  );
}
