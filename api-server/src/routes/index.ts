import { Context, Hono } from "hono";
import NodeWatcher from "../lib/process-watch.js";

const router = new Hono()

const nodeWatcher = new NodeWatcher()

router.get('/list', async (c: Context) => {
    const ps_list = await nodeWatcher.list();
    return c.json({ps_list});
});

router.get('/details', async (c: Context) => {
    const { pid } = c.req.query();
    if (pid === undefined || pid === '') {
        return c.json({ message: 'Please pass a process id' });
    }
    const processDetails = await nodeWatcher.getOne(parseInt(pid))
    return c.json({processDetails})
})

router.get('/status', async (c: Context) => {
    const { name } = c.req.query();
    if (name === undefined || name === '') {
        return c.json({message: `Please pass a process name as query string`})
    }

    const processDetails = await nodeWatcher.findOne(name);
    if (processDetails === null) {
        return c.json({ message: 'No such process running on the machine'})
    }

    return c.json({processDetails})
})

router.delete('/delete', async (c: Context) => {
    const { pid } = c.req.query();
    if (pid === undefined || pid === '') {
        return c.json({ message: 'No such process running on the machine' })

    }
    if (!(await nodeWatcher.killOne(parseInt(pid)))) {
        return c.json({ message: 'No such process running on the machine' })
    }
    else {
        return c.json({ message: `Process ${pid} has been stopped` })
    }
})

export default router