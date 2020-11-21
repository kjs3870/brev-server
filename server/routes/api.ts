import express from "express";
import authRouter from "./auth";
import signUpRotuer from "./signup";
import movieRouter from "./movie";

const router: express.Router = express.Router();

router.use("/auth", authRouter);
router.use("/signup", signUpRotuer);
router.use("/movie", movieRouter);

export default router;
