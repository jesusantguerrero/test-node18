import express from "express";
import { siteController } from "../sites.mjs";
import prisma from "../../libs/db.mjs";
import { runBackground } from "../../utils/background-checks.mjs";
import { useSocket } from "../../libs/socket.mjs";

const SiteRouter = express.Router();
const { getSites, saveSite, update, remove } = siteController(prisma)

SiteRouter.get('/', async (_req, res) => {
    res.json(await getSites())
})

SiteRouter.post('/', async (req, res) => {
    const body = req.body
    const site = await saveSite(body)
    res.json(site)
})

SiteRouter.patch('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    const site = await update(id, body)
   return res.json(site)
})

SiteRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const site = await remove(id)
    return res.json(site)
})

SiteRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    const site = await update(id, body)
    return res.json(site)
})

SiteRouter.post('/check', async (req, res) => {
    const { getInstance } = useSocket()
    await runBackground(true, getInstance())
    const sites = await getSites()
    res.json(sites)
})

export { SiteRouter }