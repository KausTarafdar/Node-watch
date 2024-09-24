import { Context, Hono } from "hono";
import NodeWatcher from "../lib/process-watch";

const router = new Hono()

const nodeWatcher = new NodeWatcher()

router.get('/list', (c) => {
    nodeWatcher.list()
    return c.json({ message: "hello" });
});

router.get('/details/:processId', (c: Context) => {
    // const processId: number = parseInt(c.req.param('processId'))
    // const res:string = nodeWatcher.getOne(processId);
    return c.json({ message: `${c.req.param('processId')}` })
})

router.get('/status/:processName', (c: Context) => {
    return c.json({ message: `Received ${c.req.param('processName')}` })
})

router.delete('/:processId', (c: Context) => {
    return c.json({ message: `Received ${c.req.param('processId')}` })
})

export default router