import path from "node:path/posix";
import psList, { ProcessDescriptor } from "ps-list";
import extractDir from "./extract.js";

export interface Process {
	pid: number;
    name: string;
	ppid: number;
	process_path: string;
	cpu: number;
	memory: number;
	uid: number;
}

class NodeWatcher {
    async list(): Promise<Process[]>{
        if(process.platform !== 'win32') {
            const processes = await psList();
            const nodeProcesses = processes.filter((p) => p.cmd!.split(' ')[0] === '/usr/bin/node')
            var processArray: Process[] = []

            for (let i = 0; i < nodeProcesses.length; i++) {
                let pathStr = path.parse(nodeProcesses[i].cmd!);
                let processDir = extractDir(path.parse(nodeProcesses[i].cmd!).dir)
                let process: Process = {
                    pid: nodeProcesses[i].pid,
                    name: nodeProcesses[i].name,
                    ppid: nodeProcesses[i].ppid,
                    process_path: processDir + pathStr.base,
                    cpu: nodeProcesses[i].cpu!,
                    memory: nodeProcesses[i].memory!,
                    uid: nodeProcesses[i].uid!,
                }
                processArray.push(process)
            }
            console.log(processArray)

            return processArray
        }
        else {
            throw new Error('Architecture not supported')
        }
    }

    async getOne(pid: number): Promise<ProcessDescriptor | boolean> {
        if(process.platform !== 'win32'){
            const processes = await psList();
            let res: ProcessDescriptor | boolean = false
            processes.forEach((p) => {
                if(p.pid === pid) {
                    res = p
                }
            })
            return res
        }
        else {
            return false
        }
    }

    async findOne(pName: string) {
        //Find a node service by fuzzy matching the P name
        if (process.platform !== 'win32') {
            const processes = await psList()
            const nodeProcesses = processes.filter((p) => p.cmd!.split(' ')[0] === '/usr/bin/node')
            const matchedProcess = matchProcess(nodeProcesses, pName);
            
        }
        else {
            console.error("Architecture not supported")
        }
    }

    killOne(pid: Number) {
        //Provide the id to kill a process
    }
}

export default NodeWatcher