import { Context, Hono } from "hono";
import NodeWatcher from "../lib/process-watch.js";

const router = new Hono()

const nodeWatcher = new NodeWatcher()

router.get('/list', async (c) => {
    const ps_list = await nodeWatcher.list();
    return c.json({ps_list});
});

router.get('/details/:processId', async (c: Context) => {
    const processDetails = await nodeWatcher.getOne(parseInt(c.req.param('processId')))
    return c.json({processDetails})
})

router.get('/status/:processName', (c: Context) => {
    const processDetails = nodeWatcher.findOne(c.req.param('processName'));
    return c.json({ message: `Received ${c.req.param('processName')}` })
})

router.delete('/:processId', (c: Context) => {
    return c.json({ message: `Received ${c.req.param('processId')}` })
})

export default router