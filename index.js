import { getArticles } from "./libs/index.mjs"
import { SiteRouter } from "./controllers/routes/index.mjs"
import db from "./libs/db.mjs";
import express from "express";

export const prisma = db;

const app = express();

app.use('/api/v1/sites', SiteRouter)
app.get('/api/v1/articles', (_req, res) => {
  res.send(getArticles())
})
app.get('/api/v1', (_req, res) => {
  res.send('Checker v1!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
})