import express, { Request, Response } from "express";
import passport from "passport";
import User from "../sequelize/models/user.model";
import Movie from "../sequelize/models/movie.model";
import Repo from "../sequelize/models/repo.model";

const router = express.Router();

const getUserInfo = async (email: string) => {
  const userInfo = await User.findOne({
    attributes: ["email", "nickname"],
    include: [Movie, Repo],
    where: { email },
  });

  return userInfo;
};

/** local login */
router.post(
  "/login",
  passport.authenticate("local"),
  async (req: Request, res: Response) => {
    const email = req.user.email as string;

    try {
      const userInfo = await getUserInfo(email);
      res.status(200).send(userInfo);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

/** naver login */
router.get("/login/naver", passport.authenticate("naver"));

router.get(
  "/login/naver/callback",
  passport.authenticate("naver"),
  async (req: Request, res: Response) => {
    const email = req.user.email as string;

    try {
      const userInfo = await getUserInfo(email);
      res.status(200).send(userInfo);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

/** google login */
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google"),
  async (req: Request, res: Response) => {
    const email = req.user.email as string;

    try {
      const userInfo = await getUserInfo(email);
      res.status(200).send(userInfo);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

export default router;
