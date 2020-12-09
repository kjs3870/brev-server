import { Request, Response, NextFunction } from "express";
import User from "../../sequelize/models/user.model";

const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.params;
  const user = await User.findOne({ where: { email } });
  if (user) return next();
  return res.json({ isUser: false });
};

export default isUser;
