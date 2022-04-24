import cors from "cors"
import express from "express";
import { getArticles } from "./libs/index.mjs"
import { SiteRouter } from "./controllers/routes/index.mjs"
import db from "./libs/db.mjs";
import { useSocket } from "./libs/socket.mjs";
const PORT =process.env.PORT || 3000 

export const prisma = db;

const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/v1/sites', SiteRouter)
app.get('/api/v1/articles', (_req, res) => {
  res.send(getArticles())
})

app.get('/api/v1', (_req, res) => {
  res.send('Checker v1!')
})

const { getServer } = useSocket(app)
const server = getServer()
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})