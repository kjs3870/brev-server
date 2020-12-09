import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../sequelize/models/user.model";
import sendCertNum from "../my_modules/middleware/sendCertNum";
import confirmCertNum from "../my_modules/middleware/confirmCertNum";
import isUser from "../my_modules/middleware/isUser";
import sendEmail from "../my_modules/sendEmail";

dotenv.config();
const router: Router = Router();

router.get("/cert/:email", isUser, sendCertNum);

router.get("/cert/confirm/:email/:certNum", confirmCertNum);

const getRandomInt = (): number => {
  const min = Math.ceil(100000);
  const max = Math.floor(999999);
  return Math.floor(Math.random() * (max - min)) + min;
};

router.get("/temppwd/:email", isUser, async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    let tempPassword = await bcrypt.hash(
      String(getRandomInt()),
      Number(process.env.SALT_ROUNDS)
    );
    tempPassword = tempPassword.slice(10, 20);
    const isSend = await sendEmail(email, tempPassword);
    const tempHash = await bcrypt.hash(
      tempPassword,
      Number(process.env.SALT_ROUNDS)
    );
    await User.update({ password: tempHash }, { where: { email } });
    return res.json({ isSend });
  } catch (err) {
    console.error(err);
    return res.json({ isSend: false });
  }
});

export default router;
