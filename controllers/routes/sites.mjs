import express from "express";
import { siteController } from "../sites.mjs";
const SiteRouter = express.Router();
import prisma from "../../libs/db.mjs";
const { getSites} = siteController(prisma)

SiteRouter.get('/', async (_req, res) => {
    res.json(await getSites())
})

export { SiteRouter }