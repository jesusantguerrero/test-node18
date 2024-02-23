import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path";
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()

// app.use('/api/v1/sites', SiteRouter)
// app.use('/api/v1/compile', CompilerRouter)
// app.use('/api/v1/products', ProductRouter)


const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

  console.log(_dirname);

app.get(
  '/react/*', 
  serveStatic({
     root: `./`,
     rewriteRequestPath: (path) => path.replace(/^\/react/, '/dist/react')
  }))

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
