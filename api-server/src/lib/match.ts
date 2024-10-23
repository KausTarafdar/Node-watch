import { Process } from "./process-watch.js";

// Robin Karp String Matching Algorithm used for string matching
export default function matchProcess(nodeProcesses: Process[], searchString: string) {
    //Get the process names array
    const processNames = nodeProcesses.map((process) => process.name);
    //For each processName, try nd match input string and find a match
    processNames.forEach((process) => {
        if (stringMatch(process, searchString)) {
            return process
        }
    })

    return null
}

function stringMatch(sArr: string, sSearch: string){
    const window = sSearch.length
    const searchHash = hashString(sSearch)
    for (let i = 0; i<sArr.length - window; i++) {

        let subStr = sArr.substring(i, i+window);
        let hashSubStr = hashString(subStr)

        if (hashSubStr === searchHash) {
            if (subStr === sSearch) {
                return true
            }
        }
    }

    return false
}

function hashString(s: string): number{
    let hash = 0
    for (let i = 0; i++; i<s.length) {
        hash += s.charCodeAt(i);
    }
    return hash
}

const search = 'aabadabwdabwdbabbaawbdaiwbda'
const vari = 'abbb'
console.log(stringMatch(search, vari))