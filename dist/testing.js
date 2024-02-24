import GraphNode from './Node.js';
let modMap = new Map();
main();
async function main() {
    let CurrModule = await CallModule('CS2040S');
    if (CurrModule != undefined) {
        console.log(CurrModule.prereqTree);
        //processModule(CurrModule as Modules.Module)
    }
    else {
        console.log("hhahahahaha");
    }
}
function processModule(data) {
    //console.log(data);
    const ptree = data.prereqTree;
    if (typeof ptree == 'undefined') {
        let current = new GraphNode(data, [], []);
        modMap.set(data.moduleCode, current);
        console.log(modMap);
    }
    else if (typeof ptree == "string") {
    }
    /*const ptree: Modules.PrereqTree | undefined = data.prereqTree;
    if (typeof ptree == 'string') {
        new GraphNode();
    }*/
}
async function CallModule(moduleCode) {
    let request = 'https://api.nusmods.com/v2/2023-2024/modules/' + moduleCode + ".json";
    return fetch(request).then(response => {
        if (!response.ok) {
            console.log("response is not ok");
            return undefined;
        }
        else {
            console.log("working");
            return response.json();
        }
    }).catch(e => {
        console.log("Error: e");
        return undefined;
    });
}
