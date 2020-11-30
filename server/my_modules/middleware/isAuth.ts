import { Response, NextFunction } from "express";
import { UserRequest } from "../../interface/request";

interface ResObj {
  isAuth: boolean;
  flash?: string;
}

const isAuth = (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const resObj: ResObj = {
    isAuth: false,
    flash: req.flash("error").toString(),
  };

  if (!req.user) {
    return res.json(resObj);
  }
  return next();
};

export default isAuth;
