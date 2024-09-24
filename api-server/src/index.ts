import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from './config/config'
import router from '../routes'

const app = new Hono()
const port = config.port

console.log(config.environment)

app.route('/', router);

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
