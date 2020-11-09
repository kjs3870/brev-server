import {
  Table,
  Column,
  AllowNull,
  PrimaryKey,
  Model,
  DataType,
  Default,
  HasMany,
} from "sequelize-typescript";
import Movie from "./movie.model";
import Repo from "./repo.model";

@Table({
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  timestamps: false,
  tableName: "users",
})
class User extends Model<User> {
  @PrimaryKey
  @Column
  email: string;

  @AllowNull(false)
  @Column
  nickname: string;

  @AllowNull(false)
  @Column
  password: string;

  @Default(DataType.NOW)
  @Column
  createdAt: Date;

  @HasMany(() => Movie)
  movies: Movie[];

  @HasMany(() => Repo)
  repos: Repo[];
}

export default User;
