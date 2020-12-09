import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import path from "path";
import dotenv from "dotenv";
import sequelize from "./sequelize/sequelize";
import passportConfig from "./passport/passport";
import apiRouter from "./routes/api";

const app: express.Application = express();

dotenv.config();
sequelize.sync().catch((err) => console.log(err));

// app.set("views", `${__dirname}/views`);
// app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../client/home/build")));
app.use(express.static(path.join(__dirname, "../client/sic/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/api", apiRouter);

app.get("/*", (req: Request, res: Response, next: NextFunction) => {
  const url = req.url.split("/");
  if (url[1] === "sic") return next();
  return res.sendFile(
    path.join(__dirname, "../client/home/build", "index.html")
  );
});

app.get("/sic/*", (req: Request, res: Response) => {
  return res.sendFile(
    path.join(__dirname, "../client/sic/build", "index.html")
  );
});

export default app;
