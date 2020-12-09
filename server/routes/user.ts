import { Router, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserRequest } from "../interface/request";
import { UserUpdate } from "../interface/user";
import User from "../sequelize/models/user.model";
import FindUserRouter from "./findUser";

dotenv.config();
const router: Router = Router();

router.use("/find", FindUserRouter);

/** 회원정보 업데이트 */
router.put("/", async (req: UserRequest, res: Response) => {
  const email = req?.user?.email;
  const updateUser = req.body as UserUpdate;

  try {
    const uu: UserUpdate = {};
    if (!email) throw new Error("NO_USER");
    if (!updateUser.password) throw new Error("NO_PASSWORD");

    const user = await User.findOne({
      attributes: ["password"],
      where: { email },
    });
    const isMatch = await bcrypt.compare(updateUser.password, user.password);
    if (!isMatch) throw new Error("PASSWORD_NOT_MATCH");

    if (updateUser.nickname) uu.nickname = updateUser.nickname;
    if (updateUser.newPassword) {
      if (updateUser.newPassword === updateUser.newPasswordConfirm)
        uu.password = await bcrypt.hash(
          updateUser.newPassword,
          Number(process.env.SALT_ROUNDS)
        );
      else throw new Error("NEW_PASSWORD_NOT_MATCH");
    }

    await User.update(uu, { where: { email } });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

/** 회원 탈퇴 */
router.delete("/", async (req: UserRequest, res: Response) => {
  const email = req?.user?.email;
  try {
    if (!email) throw new Error("NO_USER");
    await User.destroy({ where: { email } });
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

export default router;
