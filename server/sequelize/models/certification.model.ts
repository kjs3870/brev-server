import {
  Table,
  Column,
  AllowNull,
  Model,
  ForeignKey,
} from "sequelize-typescript";
import User from "./user.model";

@Table({
  charset: "utf8mb4",
  collate: "utf8mb4_general_ci",
  timestamps: true,
  tableName: "certification",
})
class Certification extends Model<Certification> {
  @AllowNull(false)
  @Column
  number: number;

  @AllowNull(false)
  @Column
  email: string;
}

export default Certification;
