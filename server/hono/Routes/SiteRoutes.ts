import { Hono } from "hono";
import { siteController} from "../../app/controllers/sites.mjs";

const Router = new Hono();

const {
    getSites, saveSite, update, remove,
} = siteController();

  
Router.get('/', async (c) => {
    return c.json(await getSites());
});
  
//   Router.post('/', async (c) => {
//     const { body } = req;
//     const site = await saveSite(body);
//     return c.json(site);
//   });
  
//   Router.patch('/:id', async (c) => {
//     const { id } = req.params;
//     const { body } = req;
//     delete body.results;
//     delete body.action;
//     delete body.value;
//     const site = await update(id, body);
//     return res.json(site);
//   });
  
//   Router.delete('/:id', async (c) => {
//     const { id } = req.params;
//     const site = await remove(id);
//     return res.json(site);
//   });
  
//   Router.put('/:id', async (c) => {
//     const { id } = req.params;
//     const { body } = req;
//     delete body.results;
//     delete body.action;
//     delete body.value;
//     delete body.index;
//     const site = await update(id, body);
//     return res.json(site);
//   });
  
//   Router.post('/check', async (req, res) => {
//     const { getInstance } = useSocket();
//     await runBackground(true, getInstance());
//     const sites = await getSites();
//     res.json(sites);
//   });
  
//   Router.get('/check', async (req, res) => {
//     const { getInstance } = useSocket();
//     await runBackground(false, getInstance());
//     const sites = await getSites();
//     res.json(sites);
//   });
export const SiteRouter = Router