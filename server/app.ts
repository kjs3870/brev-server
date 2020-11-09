import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import sequelize from "./sequelize/sequelize";
import passportConfig from "./passport/passport";
import apiRouter from "./routes/api";

const app: express.Application = express();
sequelize.sync().catch((err) => console.log(err));

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/success", (req: Request, res: Response) => {
  res.render("success");
});

export default app;
