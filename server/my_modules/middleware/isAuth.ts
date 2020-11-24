import { Response, NextFunction } from "express";
import UserRequest from "../../interface/request";

const isAuth = (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  if (!req.user) {
    console.log("!req.user");
    return res.json({ isAuth: false });
  }
  return next();
};

export default isAuth;
