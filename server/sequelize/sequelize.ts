import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "mypage",
  username: "mp",
  password: "Mp123!@#",
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
