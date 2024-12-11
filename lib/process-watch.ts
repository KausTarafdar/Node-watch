import path from "node:path/posix";
import psList, { ProcessDescriptor } from "ps-list";
import extractDir from "./extract";
import matchProcess from "./match";
import { exec } from "node:child_process";

export interface Process {
	pid: number;
    name: string;
	ppid: number;
	process_path: string;
    full_patch?: string
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
        console.log(pid)
        if(process.platform !== 'win32'){
            const processes = await psList();
            let process: ProcessDescriptor | boolean = false
            processes.forEach((p) => {
                if(p.pid === pid) {
                    process = p
                }
            })
            console.log(process)
            return process
        }
        else {
            throw new Error('Architecture not supported')
        }
    }

    async findOne(pName: string) {
        //Find a node service by fuzzy matching the P name
        if (process.platform !== 'win32') {
            const processes = await psList()
            const nodeProcesses = processes.filter((p) => p.cmd!.split(' ')[0] === '/usr/bin/node')
            const matchedProcess = matchProcess(nodeProcesses, pName);
            if(matchedProcess === null) {
                return null
            }
            else {
                let pathStr = path.parse(matchedProcess.cmd!);
                let processDir = extractDir(path.parse(matchedProcess.cmd!).dir)
                let process: Process = {
                    pid: matchedProcess.pid,
                    name: matchedProcess.name,
                    ppid: matchedProcess.ppid,
                    process_path: processDir + pathStr.base,
                    full_patch: matchedProcess.cmd!,
                    cpu: matchedProcess.cpu!,
                    memory: matchedProcess.memory!,
                    uid: matchedProcess.uid!,
                }
                return process
            }
        }
        else {
            throw new Error("Architecture not supported")
        }
    }

    async killOne(pid: number) {
        try {
            if (await this.getOne(pid)) {
                exec(`kill -9 ${pid}`)
                console.log(`Successfully stopped process`)
                return true
            }
            else {
                throw new Error('No such process')
            }
        } catch (err) {
            console.error(err)
            return false
        }
    }
}

export default NodeWatcher