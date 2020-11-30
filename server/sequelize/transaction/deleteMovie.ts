import sequelize from "../sequelize";
import Movie from "../models/movie.model";
import MovieGenre from "../models/moviegenre.model";
import MovieCountry from "../models/moviecountry.model";
import Actor from "../models/actor.model";
import Director from "../models/director.model";

export default async function deleteMovie(
  movieId: number,
  userEmail: string
): Promise<void> {
  const t = await sequelize.transaction();

  try {
    await MovieGenre.destroy({ where: { movieId }, transaction: t });
    await MovieCountry.destroy({ where: { movieId }, transaction: t });
    await Actor.destroy({ where: { movieId }, transaction: t });
    await Director.destroy({ where: { movieId }, transaction: t });
    await Movie.destroy({ where: { id: movieId, userEmail }, transaction: t });

    return t.commit();
  } catch (err) {
    console.error(err);
    return t.rollback();
  }
}
