import { Request } from "express";
import SelfIntro from "../sequelize/models/self-intro.model";
import User from "../sequelize/models/user.model";

interface UserRequest extends Request {
  user: User;
}

interface SelfIntroRequest extends UserRequest {
  body: SelfIntro;
}

export { UserRequest, SelfIntroRequest };
