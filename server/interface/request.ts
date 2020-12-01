import { Request } from "express";
import SelfIntro from "../sequelize/models/self-intro.model";
import User from "../sequelize/models/user.model";
import UserUpdate from "./user";

interface UserRequest extends Request {
  user: User;
}

interface SelfIntroRequest extends UserRequest {
  body: SelfIntro;
}

interface UserUpdateRequest extends UserRequest {
  body: UserUpdate;
}

export { UserRequest, SelfIntroRequest, UserUpdateRequest };
