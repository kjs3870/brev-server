import express from "express";
import authRouter from "./auth";
import signUpRotuer from "./signup";

const router: express.Router = express.Router();

router.use("/auth", authRouter);
router.use("/signup", signUpRotuer);

export default router;
