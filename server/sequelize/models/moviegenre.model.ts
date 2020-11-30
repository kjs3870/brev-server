import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";
import Genre from "./genre.model";
import Movie from "./movie.model";

@Table({
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  timestamps: false,
  tableName: "moviegenre",
})
class MovieGenre extends Model<MovieGenre> {
  @ForeignKey(() => Movie)
  @AllowNull(false)
  @Column
  movieId: number;

  @ForeignKey(() => Genre)
  @AllowNull(false)
  @Column
  genreCode: number;
}

export default MovieGenre;
