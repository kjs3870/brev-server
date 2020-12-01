import { Router, Response } from "express";
import bcrypt from "bcrypt";
import { UserRequest, UserUpdateRequest } from "../interface/request";
import UserUpdate from "../interface/user";
import User from "../sequelize/models/user.model";

const router: Router = Router();

/** 회원정보 업데이트 */
router.put("/", async (req: UserUpdateRequest, res: Response) => {
  const email = req?.user?.email;
  const nickname = req?.body?.nickname;
  const password = req?.body?.password;
  const newPassword = req?.body?.newPassword;
  const newPasswordConfirm = req?.body?.newPasswordConfirm;

  try {
    const updateParam: UserUpdate = {};
    const saltRound = 10;
    if (!email) throw new Error("NO_USER");
    if (!password) throw new Error("NO_PASSWORD");

    const user = await User.findOne({
      attributes: ["password"],
      where: { email },
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("PASSWORD_NOT_MATCH");

    if (nickname) updateParam.nickname = nickname;
    if (newPassword) {
      if (newPassword === newPasswordConfirm)
        updateParam.password = await bcrypt.hash(newPassword, saltRound);
      else throw new Error("NEW_PASSWORD_NOT_MATCH");
    }

    await User.update(updateParam, { where: { email } });
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
