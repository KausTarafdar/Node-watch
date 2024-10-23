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
                let res = false;
                processes.forEach((p) => {
                    if (p.pid === pid) {
                        res = p;
                    }
                });
                return res;
            }
            else {
                return false;
            }
        });
    }
    findOne(pName) {
        return __awaiter(this, void 0, void 0, function* () {
            //Find a node service by fuzzy matching the P name
            if (process.platform !== 'win32') {
                const processes = yield psList();
                const nodeProcesses = processes.filter((p) => p.cmd.split(' ')[0] === '/usr/bin/node');
                const matchedProcess = matchProcess(nodeProcesses, pName);
            }
            else {
                console.error("Architecture not supported");
            }
        });
    }
    killOne(pid) {
        //Provide the id to kill a process
    }
}
export default NodeWatcher;
