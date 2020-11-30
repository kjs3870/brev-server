import {
  Table,
  Column,
  AllowNull,
  AutoIncrement,
  PrimaryKey,
  Model,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user.model";

@Table({
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  timestamps: false,
  tableName: "self_introductions",
})
class SelfIntro extends Model<SelfIntro> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  company: string;

  @Column
  title: string;

  @Column(DataType.STRING(3000))
  content: string;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column
  createdAt: Date;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column
  updatedAt: Date;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userEmail: string;

  @BelongsTo(() => User)
  user: User;
}

export default SelfIntro;
