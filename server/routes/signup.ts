import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../sequelize/models/user.model";

const router: express.Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const saltRounds = 10;
  const inputUser = req.body as User;

  try {
    const user = await User.findOne({ where: { email: inputUser.email } });
    if (user) return res.send({ error: "exist email" });
    inputUser.password = await bcrypt.hash(inputUser.password, saltRounds);
    const iu: User = await User.create(inputUser);

    return res.status(200).send({ email: iu.email, nickname: iu.nickname });
  } catch (e) {
    return res.send(e);
  }
});

export default router;
