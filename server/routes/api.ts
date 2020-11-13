import express from "express";
import authRouter from "./auth";
import signUpRotuer from "./signup";
import searchRouter from "./search";

const router: express.Router = express.Router();

router.use("/auth", authRouter);
router.use("/signup", signUpRotuer);
router.use("/search", searchRouter);

export default router;
