import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    min: 0,
    max: 10,
    idle: 10000,
    acquire: 10000,
  },
  timezone: "Asia/Seoul",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  models: [`${__dirname}/./models/`],
  logging: false,
});

export default sequelize;
