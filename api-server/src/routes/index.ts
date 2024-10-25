import { Context, Hono } from "hono";
import NodeWatcher from "../lib/process-watch.js";

const router = new Hono()

const nodeWatcher = new NodeWatcher()

router.get('/list', async (c: Context) => {
    try {
        const ps_list = await nodeWatcher.list();

        return c.json({
            Success: '200',
            Message: 'Process details found',
            Data: ps_list
        })

    } catch (err) {
        return c.json({
            Error: '500',
            Message: 'Something went wrong..'
        })
    }
});

router.get('/details', async (c: Context) => {
    const { pid } = c.req.query();
    if (pid === undefined || pid === '') {
        return c.json({
            Error: '400',
            Message: 'Missing pid in query'
        });
    }
    const processDetails = await nodeWatcher.getOne(parseInt(pid))
    return c.json({
        Success: '200',
        Message: 'All process details found',
        Data: processDetails
    })

})

router.get('/status', async (c: Context) => {
    const { name } = c.req.query();
    if (name === undefined || name === '') {
        return c.json({
            Error: '400',
            Message: 'Missing name in query'
        })
    }

    const processDetails = await nodeWatcher.findOne(name);
    if (processDetails === null) {
        return c.json({
            Error: '400',
            Message: 'No such process running on the machine'
        })
    }

    return c.json({
        Success: '200',
        Message: 'Process found',
        Data: processDetails
    })
})

router.delete('/kill', async (c: Context) => {
    const { pid } = c.req.query();
    if (pid === undefined || pid === '') {
        return c.json({
            Error: '400',
            Message: 'Missing pid in query'
        })
    }

    if (!(await nodeWatcher.killOne(parseInt(pid)))) {
        return c.json({
            Error: '400',
            Message: 'No such process running on the machine'
        })
    }
    else {
        return c.json({
            Success: '200',
            Message: `Process ${pid} has been stopped`,
            Data: {}
        })
    }
})

export default router