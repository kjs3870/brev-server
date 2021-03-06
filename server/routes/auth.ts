import express, { Request, Response } from "express";
import passport from "passport";
import isAuth from "../my_modules/middleware/isAuth";
import { UserRequest } from "../interface/request";
import User from "../sequelize/models/user.model";
import Movie from "../sequelize/models/movie.model";
import Repo from "../sequelize/models/repo.model";
import Genre from "../sequelize/models/genre.model";
import Country from "../sequelize/models/country.model";
import Actor from "../sequelize/models/actor.model";
import Director from "../sequelize/models/director.model";

const router = express.Router();
const CLIENT_URL = "/";

const getUserInfo = async (email: string) => {
  const userInfo = await User.findOne({
    attributes: ["email", "nickname"],
    include: [
      {
        model: Movie,
        include: [
          {
            model: Genre,
            attributes: ["genre"],
          },
          {
            model: Country,
            attributes: ["country"],
          },
          {
            model: Actor,
            attributes: ["name"],
          },
          {
            model: Director,
            attributes: ["name"],
          },
        ],
      },
      Repo,
    ],
    where: { email },
  });

  return userInfo;
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
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL,
    failureFlash: true,
  })
);

/** naver login */
router.get("/login/naver", passport.authenticate("naver"));

router.get(
  "/login/naver/callback",
  passport.authenticate("naver", {
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL,
    failureFlash: true,
  })
);

/** google login */
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL,
    failureFlash: true,
  })
);

/** logout */
router.get("/logout", (req: Request, res: Response) => {
  req.logOut();
  res.redirect(CLIENT_URL);
});

export default router;
