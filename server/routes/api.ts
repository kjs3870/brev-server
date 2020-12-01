import express from "express";
import authRouter from "./auth";
import signUpRotuer from "./signup";
import movieRouter from "./movie";
import repoRouter from "./repo";
import selfIntroRouter from "./self-intro";
import userRouter from "./user";

const router: express.Router = express.Router();

router.use("/auth", authRouter);
router.use("/signup", signUpRotuer);
router.use("/movie", movieRouter);
router.use("/repo", repoRouter);
router.use("/self-intro", selfIntroRouter);
router.use("/user", userRouter);

export default router;
