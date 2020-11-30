import express, { Response } from "express";
import isAuth from "../my_modules/middleware/isAuth";
import { UserRequest } from "../interface/request";
import Repo from "../sequelize/models/repo.model";

const router: express.Router = express.Router();

router.post("/", isAuth, async (req: UserRequest, res: Response) => {
  const repo = req.body as Repo;
  repo.userEmail = req.user.email;

  try {
    const r = await Repo.create(repo);
    res.status(200).send(r);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
