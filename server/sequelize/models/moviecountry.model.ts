import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";
import Country from "./country.model";
import Movie from "./movie.model";

@Table({
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  timestamps: false,
  tableName: "moviecountry",
})
class MovieCountry extends Model<MovieCountry> {
  @ForeignKey(() => Movie)
  @AllowNull(false)
  @Column
  movieId: number;

  @ForeignKey(() => Country)
  @AllowNull(false)
  @Column
  countryCode: string;
}

export default MovieCountry;
