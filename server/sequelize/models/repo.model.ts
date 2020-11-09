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
  tableName: "reposByUser",
})
class Repo extends Model<Repo> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  url: string;

  @ForeignKey(() => User)
  @Column
  userEmail: string;

  @BelongsTo(() => User)
  user: User;
}

export default Repo;
