import {
  Table,
  Column,
  AllowNull,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Movie from "./movie.model";

@Table({
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  timestamps: false,
  tableName: "directorsbymovie",
})
class Director extends Model<Director> {
  @AllowNull(false)
  @Column
  name: string;

  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @BelongsTo(() => Movie)
  movie: Movie;
}

export default Director;
