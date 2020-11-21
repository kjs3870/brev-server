import axios from "axios";
import cheerio from "cheerio";
import { MovieDetail } from "./interface/movie";

const getMovieDetail = async (code: string): Promise<MovieDetail> => {
  const html = await axios.get(
    `https://movie.naver.com/movie/bi/mi/basic.nhn?code=${code}`
  );

  const $ = cheerio.load(html.data);

  const con = $("div.video div.story_area");
  const title = con.find("h5.h_tx_story").text();
  const content = con.find("p.con_tx").text();
  const story = `${title}||${content}`;

  const posterUrl = $("div.mv_info_area div.poster a").find("img").attr("src");
  const thumnailUrl = $("div.poster").find("img").attr("src");

  const spec = $("dl.info_spec dd");
  const genres = spec
    .eq(0)
    .find("p span")
    .eq(0)
    .find("a")
    .map((idx, elem) => elem.children[0].data)
    .get();

  const countries = spec
    .eq(0)
    .find("p span")
    .eq(1)
    .find("a")
    .map((idx, elem) => {
      const country = elem.children[0].data;
      return country === "한국" ? "대한민국" : country;
    })
    .get();

  const runningTime = spec.eq(0).find("p span").eq(2).text().trim();
  const publicDate = spec
    .eq(0)
    .find("p span")
    .eq(3)
    .find("a")
    .map((idx, elem) => elem.children[0].data.trim())
    .get();
  const pubDate = publicDate.slice(publicDate.length - 2).join("");

  return {
    story,
    posterUrl,
    thumnailUrl,
    genres,
    countries,
    runningTime,
    pubDate,
  };
};

export default getMovieDetail;
