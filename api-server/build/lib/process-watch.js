var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from "node:path/posix";
import psList from "ps-list";
import extractDir from "./extract.js";
class NodeWatcher {
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.platform !== 'win32') {
                const processes = yield psList();
                const nodeProcesses = processes.filter((p) => p.cmd.split(' ')[0] === '/usr/bin/node');
                console.log(nodeProcesses);
                var processArray = [];
                for (let i = 0; i < nodeProcesses.length; i++) {
                    let pathStr = path.parse(nodeProcesses[i].cmd);
                    let processDir = extractDir(path.parse(nodeProcesses[i].cmd).dir);
                    let process = {
                        pid: nodeProcesses[i].pid,
                        name: nodeProcesses[i].name,
                        ppid: nodeProcesses[i].ppid,
                        process_path: processDir + pathStr.base,
                        cpu: nodeProcesses[i].cpu,
                        memory: nodeProcesses[i].memory,
                        uid: nodeProcesses[i].uid,
                    };
                    processArray.push(process);
                }
                console.log(processArray);
                return processArray;
            }
            else {
                throw new Error('Architecture not supported');
            }
        });
    }
    getOne(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.platform !== 'win32') {
                const processes = yield psList();
                processes.forEach((p) => {
                    if (p.pid === pid) {
                        return p;
                    }
                });
                return false;
            }
            return false;
        });
    }
    findOne(pName) {
    }
    killOne(pid) {
    }
}
export default NodeWatcher;
