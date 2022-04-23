import express from "express";
import { siteController } from "../sites.mjs";
const SiteRouter = express.Router();
import prisma from "../../libs/db.mjs";
const { getSites, saveSite } = siteController(prisma)

SiteRouter.get('/', async (_req, res) => {
    res.json(await getSites())
})

SiteRouter.post('/', async (req, res) => {
    const body = req.body
    const site = await saveSite(body)
    res.json(site)
})

export { SiteRouter }