import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import router from './routes/index'

const app = new Hono()

app.route('/', router);

console.log('Server is running on port 16998')

serve({
  fetch: app.fetch,
  port: 16998
})
