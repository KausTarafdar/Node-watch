export default function extractDir(dir: string): string{
    const re:RegExp = /.*(?=node_module)/g;
    let matches = dir.match(re);
    if (matches !== null) {
        let processDir = matches[0].split('/').splice(-3).join('/');
        return processDir
    }
    return dir.split('/').pop() + '/'
}