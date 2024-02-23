import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path";
import { serveStatic } from '@hono/node-server/serve-static'
import { SiteRouter } from './server/hono/Routes/SiteRoutes';

const app = new Hono()


app.get(
  '/react/*', 
  serveStatic({
     root: `./`,
     rewriteRequestPath: (path) => path.replace(/^\/react/, '/dist/react')
  }))

app.get(
  '/vue/*', 
  serveStatic({
     root: `./`,
     rewriteRequestPath: (path) => path.replace(/^\/vue/, '/dist/vue')
  }))

app.route('/api/v1/sites', SiteRouter)
// app.route('/api/v1/compile', CompilerRouter)
// app.route('/api/v1/products', ProductRouter)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
