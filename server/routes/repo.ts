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
    return res.status(200).send(r);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/:id", async (req: UserRequest, res: Response) => {
  const { id } = req.params;
  const userEmail = req?.user?.email;

  try {
    await Repo.destroy({ where: { id, userEmail } });
    return res.status(200).send("repository delete complete");
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default router;
