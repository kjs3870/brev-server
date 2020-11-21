import { Request } from "express";
import User from "../sequelize/models/user.model";

interface UserRequest extends Request {
  user: User;
}

export default UserRequest;
