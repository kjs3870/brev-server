import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../sequelize/models/user.model";

const router: express.Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const saltRounds = 10;
  const inputUser = req.body as User;

  try {
    inputUser.password = await bcrypt.hash(inputUser.password, saltRounds);
    const iu: User = await User.create(inputUser);

    res.status(200).send({ email: iu.email, nickname: iu.nickname });
  } catch (e) {
    res.status(400).redirect("/");
  }
});

export default router;
