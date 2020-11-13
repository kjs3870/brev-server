import express, { Request, Response } from "express";
import axios from "axios";
import { MovieResponse } from "../interface/interface";
import AppConfig from "../config/config.secret";

const router: express.Router = express.Router();

router.get("/movie", (req: Request, res: Response) => {
  const { query } = req.query;
  axios
    .get("https://openapi.naver.com/v1/search/movie.json", {
      params: { query },
      headers: {
        "X-Naver-Client-Id": AppConfig.naver.clientID,
        "X-Naver-Client-Secret": AppConfig.naver.clientSecret,
      },
    })
    .then((data: MovieResponse) => {
      res.status(200).send({ items: data.data.items });
    })
    .catch((err) => console.log(err));
});

export default router;
