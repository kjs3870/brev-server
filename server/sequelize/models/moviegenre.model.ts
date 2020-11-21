import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
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
  @Column
  movieId: number;

  @ForeignKey(() => Genre)
  @Column
  genreCode: number;
}

export default MovieGenre;
