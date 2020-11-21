import {
  Table,
  Column,
  AllowNull,
  Model,
  PrimaryKey,
  BelongsToMany,
} from "sequelize-typescript";
import Movie from "./movie.model";
import MovieCountry from "./moviecountry.model";

@Table({
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  timestamps: false,
  tableName: "country",
})
class Country extends Model<Country> {
  @PrimaryKey
  @Column
  code: string;

  @AllowNull(false)
  @Column
  country: string;

  @BelongsToMany(() => Movie, () => MovieCountry)
  movies: Movie[];
}

export default Country;
