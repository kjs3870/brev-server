import express, { Request, Response } from "express";
import axios from "axios";
import {
  MovieResponse,
  MovieDetail,
  MovieItemResponse,
  MovieResponseDetail,
} from "../interface/movie";
import { UserRequest } from "../interface/request";
import AppConfig from "../config/config.secret";
import getMovieDetail from "../my_modules/scraper";
import registMovie from "../sequelize/transaction/registMovie";
import deleteMovie from "../sequelize/transaction/deleteMovie";

const router: express.Router = express.Router();

router.get("/search", (req: Request, res: Response) => {
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
      const { items } = data.data;
      const REG = /(<b>|<\/b>|amp;)/g;
      const movies = items.map((item) => {
        const obj: MovieItemResponse = {
          title: item.title.replace(REG, ""),
          subtitle: item.subtitle.replace(REG, ""),
          link: item.link,
          image: item.image,
          pubYear: item.pubDate,
          directors: item.director.split("|").slice(0, -1),
          actors: item.actor.split("|").slice(0, -1),
          userRating: item.userRating,
        };

        return obj;
      });
      res.status(200).send({ movies });
    })
    .catch((err) => console.log(err));
});

router.post("/regist", (req: UserRequest, res: Response) => {
  const movie = req.body as MovieResponseDetail;
  const email = req?.user?.email;
  if (email !== undefined) {
    movie.userEmail = email;
    registMovie(movie);
  }

  res.status(200);
});

router.get("/search/:code", async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const detail: MovieDetail = await getMovieDetail(code);
    res.status(200).send({ detail });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req: UserRequest, res: Response) => {
  const movieId = Number(req.params.id);
  const userEmail = req?.user?.email;

  try {
    await deleteMovie(movieId, userEmail);
    return res.status(200).send("movie delete complete");
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default router;
