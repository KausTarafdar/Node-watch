import { ProcessDescriptor } from "ps-list";

// Robin Karp String Matching Algorithm used for string matching
export default function matchProcess(nodeProcesses: ProcessDescriptor[], searchString: string) {
    //Get the process names array
    const processNames = nodeProcesses.map((process) => process.cmd!);
    //For each processName, try nd match input string and find a match
    let match
    for (let i=0; i<processNames.length; i++) {
        if (stringMatch(processNames[i], searchString)) {
            match = i
        }
    }
    if (match !== undefined) {
        return nodeProcesses[match]
    }
    else {
        return null
    }
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