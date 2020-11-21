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
  tableName: "actorsbymovie",
})
class Actor extends Model<Actor> {
  @AllowNull(false)
  @Column
  name: string;

  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @BelongsTo(() => Movie)
  movie: Movie;
}

export default Actor;
