import { createServer } from "http";
import dotenv from "dotenv";
import app from "../app";

dotenv.config();

const port = Number(process.env.PORT);
const server = createServer(app);

server.listen(port, () => {
  console.log(`${port}포트 서버 대기 중!`);
});

export default server;
