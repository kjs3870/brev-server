import sequelize from "../sequelize";
import Movie from "../models/movie.model";
import Genre from "../models/genre.model";
import MovieGenre from "../models/moviegenre.model";
import MovieCountry from "../models/moviecountry.model";
import Country from "../models/country.model";
import Actor from "../models/actor.model";
import Director from "../models/director.model";
import { MovieResponseDetail } from "../../interface/movie";

export default function registMovie(movie: MovieResponseDetail): void {
  let mId: number;

  sequelize
    .transaction()
    .then((t) => {
      return Movie.create(movie, { transaction: t }).then(async (m) => {
        mId = m.id as number;
        const genreList = await Genre.findAll({
          attributes: ["code"],
          where: { genre: movie.genres },
          transaction: t,
        });

        const mg = genreList.map((gl) => {
          const mgItem = { movieId: mId, genreCode: gl.code };
          return mgItem;
        });

        return MovieGenre.bulkCreate(mg, { transaction: t })
          .then(async () => {
            const countryList = await Country.findAll({
              attributes: ["code"],
              where: { country: movie.countries },
              transaction: t,
            });

            const mc = countryList.map((cl) => {
              const mcItem = { movieId: mId, countryCode: cl.code };
              return mcItem;
            });

            return MovieCountry.bulkCreate(mc, { transaction: t });
          })
          .then(async () => {
            const actors = movie.actors.map((a) => {
              return { name: a, movieId: mId };
            });
            const directors = movie.directors.map((d) => {
              return { name: d, movieId: mId };
            });

            await Actor.bulkCreate(actors, { transaction: t });
            await Director.bulkCreate(directors, { transaction: t });

            return t.commit();
          })
          .catch((err) => {
            return t.rollback();
          });
      });
    })
    .catch((err) => console.log(err));
}
