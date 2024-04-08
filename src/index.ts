import path from 'path';
import url from 'url';
import express from "express";
import compressionMiddleware from "compression";
import { createServer } from 'http';
import { routerMiddleware } from "@marko/run-adapter-node/middleware";
import { initSocketServer } from './socket';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const { NODE_ENV = "development", PORT = 3000 } = process.env;

console.time("Start");

const app = express();
const server = createServer(app);
initSocketServer(server);

app
  .use(compressionMiddleware())
  .use("/assets", express.static(path.join(__dirname, "assets")))
  .use(routerMiddleware());

server
  .listen(PORT, () => {
    console.log("listening");
    console.timeEnd("Start");
    console.log(`Env: ${NODE_ENV}`);
    console.log(`Address: http://localhost:${PORT}`);
  });