import { exec } from "child_process";

class NodeWatcher {
    list() {
        exec("ps -aef | grep /bin/node", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return "error";
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return "error";
            }
            console.table(stdout.split('\n'));
        });
    }

    getOne(pid: number) {
        exec(`ps -f -p ${pid}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(stdout.split(''));
        });
    }

    findOne(pName: string) {

    }

    killOne(pid: Number) {

    }
}

export default NodeWatcher