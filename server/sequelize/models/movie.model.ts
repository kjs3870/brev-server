import {
  Table,
  Column,
  AllowNull,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user.model";

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

  @ForeignKey(() => User)
  @Column
  userEmail: string;

  @BelongsTo(() => User)
  user: User;
}

export default Movie;
