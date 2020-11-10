import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import User from "../sequelize/models/user.model";
import Movie from "../sequelize/models/movie.model";
import Repo from "../sequelize/models/repo.model";

const router = express.Router();

interface UserRequest extends Request {
  user: User;
}

const getUserInfo = async (email: string) => {
  const userInfo = await User.findOne({
    attributes: ["email", "nickname"],
    include: [Movie, Repo],
    where: { email },
  });

  return userInfo;
};

const isAuth = (req: UserRequest, res: Response, next: NextFunction) => {
  if (!req.user) return res.json({ isAuth: false });
  return next();
};

router.get("/isauth", isAuth, async (req: UserRequest, res: Response) => {
  const { email } = req.user;
  try {
    const userInfo = await getUserInfo(email);
    res.status(200).json({ isAuth: true, userInfo });
  } catch (e) {
    res.status(500).send(e);
  }
});

/** local login */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/",
  })
);

/** naver login */
router.get("/login/naver", passport.authenticate("naver"));

router.get(
  "/login/naver/callback",
  passport.authenticate("naver", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/",
  })
);

/** google login */
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/",
  })
);

export default router;
