import axios from "axios";
import cheerio from "cheerio";
import Country from "./models/country.model";
import sequelize from "./sequelize";

sequelize.sync().catch((err) => console.error(err));

const getData = async () => {
  const html = await axios.get("https://devbible.tistory.com/350");

  const $ = cheerio.load(html.data);
  const $tbody = $("div.tt_article_useless_p_margin table.wikitable tbody");
  const $tr = $tbody.children("tr");
  const countryCode = [];
  $tr.each((idx, elem) => {
    const $td = $tr.eq(idx).find("td");
    const country = $td.eq(0).find("a").text().trim();
    const code = $td.eq(3).text().trim();
    countryCode[idx] = { country, code };
  });

  Country.bulkCreate(countryCode).catch((err) => console.error(err));
};

getData()
  .then()
  .catch((err) => console.error(err));
