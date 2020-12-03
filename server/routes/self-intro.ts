import express, { Request, Response } from "express";
import { UserRequest, SelfIntroRequest } from "../interface/request";
import SelfIntro from "../sequelize/models/self-intro.model";

const router: express.Router = express.Router();

/** 모든 자소서 가져오기 */
router.get("/", (req: UserRequest, res: Response) => {
  const userEmail = req.user.email;
  SelfIntro.findAll({ where: { userEmail } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.error(err));
});

/** 자소서 등록 */
router.post("/", (req: SelfIntroRequest, res: Response) => {
  const company = req?.body?.company;
  const title = req?.body?.title;
  const content = req?.body?.content;
  const userEmail = req.user.email;

  const intro = {
    company,
    title,
    content,
    userEmail,
  };

  SelfIntro.create(intro)
    .then((result) => {
      res.send({ lastInsertId: result.id });
    })
    .catch((err) => console.error(err));
});

/** 특정 자소서 가져오기 */
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  SelfIntro.findOne({ where: { id } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.error(err));
});

/** 자소서 수정 */
router.put("/:id", (req: SelfIntroRequest, res: Response) => {
  const { id } = req.params;
  const company = req?.body?.company;
  const title = req?.body?.title;
  const content = req?.body?.content;

  const updateIntro = {
    company,
    title,
    content,
    updatedAt: new Date(),
  };

  SelfIntro.update(updateIntro, { where: { id } })
    .then(() => {
      res.status(200).send("update complete");
    })
    .catch((err) => console.error(err));
});

/** 자소서 삭제 */
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  SelfIntro.destroy({ where: { id } })
    .then(() => {
      res.status(200).send("delete complete");
    })
    .catch((err) => console.error(err));
});

export default router;
