import {
  Table,
  Column,
  AllowNull,
  Model,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  Default,
  HasMany,
  DataType,
} from "sequelize-typescript";
import Genre from "./genre.model";
import Country from "./country.model";
import MovieGenre from "./moviegenre.model";
import MovieCountry from "./moviecountry.model";
import User from "./user.model";
import Actor from "./actor.model";
import Director from "./director.model";

@Table({
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  timestamps: false,
  tableName: "moviesByUser",
})
class Movie extends Model<Movie> {
  @AllowNull(false)
  @Column
  title: string;

  @Column
  subtitle: string;

  @Column
  link: string;

  @Column
  pubYear: string;

  @HasMany(() => Director)
  directors: Director[];

  @HasMany(() => Actor)
  actors: Actor[];

  @Default("0")
  @Column
  userRating: string;

  @Column(DataType.STRING(1000))
  story: string;

  @Column
  posterUrl: string;

  @Column
  thumnailUrl: string;

  @BelongsToMany(() => Genre, () => MovieGenre)
  genres: Genre[];

  @BelongsToMany(() => Country, () => MovieCountry)
  countries: Country[];

  @Column
  runningTime: string;

  @Column
  pubDate: string;

  @Default(false)
  @Column
  basket: boolean;

  @Default(false)
  @Column
  watched: boolean;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userEmail: string;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  user: User;
}

export default Movie;
