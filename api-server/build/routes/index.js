var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Hono } from "hono";
import NodeWatcher from "../lib/process-watch.js";
const router = new Hono();
const nodeWatcher = new NodeWatcher();
router.get('/list', (c) => __awaiter(void 0, void 0, void 0, function* () {
    const ps_list = yield nodeWatcher.list();
    return c.json({ ps_list });
}));
router.get('/details/:processId', (c) => __awaiter(void 0, void 0, void 0, function* () {
    const processDetails = yield nodeWatcher.getOne(parseInt(c.req.param('processId')));
    return c.json({ processDetails });
}));
router.get('/status/:processName', (c) => {
    return c.json({ message: `Received ${c.req.param('processName')}` });
});
router.delete('/:processId', (c) => {
    return c.json({ message: `Received ${c.req.param('processId')}` });
});
export default router;
