import {
  Table,
  Column,
  AllowNull,
  Model,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from "sequelize-typescript";
import Movie from "./movie.model";
import MovieGenre from "./moviegenre.model";

@Table({
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  timestamps: false,
  tableName: "genres",
})
class Genre extends Model<Genre> {
  @PrimaryKey
  @Column
  code: number;

  @AllowNull(false)
  @Column
  genre: string;

  @BelongsToMany(() => Movie, () => MovieGenre)
  movies: Movie[];
}

export default Genre;
