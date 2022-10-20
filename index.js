import { config } from "dotenv";
config()
import cors from "cors"
import express from "express";
import { getArticles } from "./server/libs/index.mjs"
import { SiteRouter, CompilerRouter, ProductRouter } from "./server/routes/index.mjs"
import db from "./server/libs/db.mjs";
import { useSocket } from "./server/libs/socket.mjs";
import { dirname, join } from "path";
import { fileURLToPath } from "url"
const PORT = process.env.PORT || 5000;

export const prisma = db;

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/v1/sites', SiteRouter)
app.use('/api/v1/compile', CompilerRouter)
app.use('/api/v1/products', ProductRouter)
app.get('/api/v1/articles', (_req, res) => {
  res.send(getArticles())
})

app.get('/api/v1', (_req, res) => {
  res.send('Checker v1!')
})


const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

app.use(express.static(`${_dirname}/packages/frontend/dist`))

app.use((req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
      next();
  } else {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      res.sendFile(join(_dirname, '/packages/frontend/dist', 'index.html'));
  }
});

const { getServer } = useSocket(app)
const server = getServer()
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})