import { config } from "dotenv";
config()
import cors from "cors"
import express from "express";
import { getArticles } from "./server/libs/index.mjs"
import { SiteRouter, CompilerRouter } from "./server/express/routes/index.mjs"
import db from "./server/libs/db.mjs";
import { useSocket } from "./server/libs/socket.mjs";
import { dirname, join } from "path";
import { fileURLToPath } from "url"
import { publish, startRedis } from "./server/libs/redis.mjs";
const PORT = process.env.PORT || 3000;

export const prisma = db;

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/v1/sites', SiteRouter)
app.use('/api/v1/compile', CompilerRouter)
app.get('/api/v1/articles', (_req, res) => {
  res.send(getArticles())
})

app.get('/api/v1', (_req, res) => {
  res.send('Checker v1!')
})


const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

app.use('/react', express.static(`${_dirname}/dist/react`))

app.use('/react', (req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
      next();
  } else {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.sendFile(join(_dirname, '/dist/react', 'index.html'));
  }
});

const { getServer } = useSocket(app)
// startRedis()
const server = getServer()
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

