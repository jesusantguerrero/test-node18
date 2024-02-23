import { Hono } from "hono";
// @ts-ignore
import { siteController} from "../../app/controllers/sites.mjs";
// @ts-ignore
import { runBackground } from "../../utils/background-checks.mjs";
// @ts-ignore
import { useSocket } from "../../libs/socket.mjs";

const Router = new Hono();

const {
    getSites, saveSite, update, remove,
} = siteController();

  
Router.get('/', async (c) => {
    return c.json(await getSites());
});
  
  Router.post('/', async (c) => {
    const body  = await c.req.json();
    console.log(body);
    const site = await saveSite(body);
    return c.json(site);
  });
  
  Router.patch('/:id', async (c) => {
    const  id  = c.req.param('id');
    const  body  = await c.req.json();
    const site = await update(id, body);
    return c.json(site);
  });
  
  Router.delete('/:id', async (c) => {
    const id  = c.req.param("id");
    const site = await remove(id);
    return c.json(site);
  });
  
  Router.put('/:id', async (c) => {
    const id  = c.req.param("id");
    const body: Record<string, string>  = await c.req.json();
    delete body.results;
    delete body.action;
    delete body.value;
    delete body.index;
    const site = await update(id, body);
    return c.json(site);
  });
  
  Router.post('/check', async (c) => {
    const { getInstance } = useSocket();
    await runBackground(true, getInstance());
    const sites = await getSites();
    c.json(sites);
  });
  
  Router.get('/check', async (c) => {
    const { getInstance } = useSocket();
    await runBackground(false, getInstance());
    const sites = await getSites();
    c.json(sites);
  });

export const SiteRouter = Router