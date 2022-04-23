import express from "express";
import { siteController } from "../sites.mjs";
import prisma from "../../libs/db.mjs";
import { runBackground } from "../../utils/background-checks.mjs";

const SiteRouter = express.Router();
const { getSites, saveSite } = siteController(prisma)

SiteRouter.get('/', async (_req, res) => {
    res.json(await getSites())
})

SiteRouter.post('/', async (req, res) => {
    const body = req.body
    const site = await saveSite(body)
    res.json(site)
})

SiteRouter.post('/check', async (req, res) => {
    await runBackground(true)
    const sites = await getSites()
    res.json(sites)
})

export { SiteRouter }