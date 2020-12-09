import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotnev from "dotenv";
import User from "../sequelize/models/user.model";
import { UserSignUp } from "../interface/user";
import sendCertNum from "../my_modules/middleware/sendCertNum";
import confirmCertNum from "../my_modules/middleware/confirmCertNum";

dotnev.config();
const router: express.Router = express.Router();

router.get("/confirm/:email", async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) return res.send({ isDupl: true });
    return res.send({ isDupl: false });
  } catch (err) {
    return res.send(err);
  }
});

router.get("/cert/:email", sendCertNum);

router.get("/cert/confirm/:email/:certNum", confirmCertNum);

router.post("/", async (req: Request, res: Response) => {
  const inputUser = req.body as UserSignUp;

  try {
    inputUser.password = await bcrypt.hash(
      inputUser.password,
      Number(process.env.SALT_ROUNDS)
    );
    const iu: User = await User.create(inputUser);

    return res.status(200).send({ email: iu.email, nickname: iu.nickname });
  } catch (e) {
    return res.send(e);
  }
});

export default router;
