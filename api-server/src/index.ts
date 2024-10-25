import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from './config/config.js'
import router from './routes/index.js'

const app = new Hono()

console.log(config.environment)

app.route('/', router);

console.log('Server is running on port 16998')

serve({
  fetch: app.fetch,
  port: 16998
})
