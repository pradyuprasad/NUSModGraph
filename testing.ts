import * as Modules from './types/modules'
import GraphNode from './Node.js'
let modMap = new Map<string, GraphNode>();

main()
async function main() :Promise<void> {
    let CurrModule : Modules.Module | undefined = await CallModule('CS2040S');
    if (CurrModule != undefined) {
        console.log(CurrModule.prereqTree)
        //processModule(CurrModule as Modules.Module)
    } else {
        console.log("hhahahahaha")
    }
}


function processModule(data: Modules.Module): void {
    //console.log(data);
    const ptree : Modules.PrereqTree | undefined = data.prereqTree
    if (typeof ptree == 'undefined'){
      let current: GraphNode = new GraphNode(data, [], [])
      modMap.set(data.moduleCode, current)
      console.log(modMap)
    }

    else if (typeof ptree == "string") {

    }
    /*const ptree: Modules.PrereqTree | undefined = data.prereqTree;
    if (typeof ptree == 'string') {
        new GraphNode();
    }*/
  }


async function CallModule(moduleCode:String) :Promise<Modules.Module | undefined> {
    let request: string = 'https://api.nusmods.com/v2/2023-2024/modules/' + moduleCode + ".json";
    return fetch(request).then(response => {
        if (!response.ok) {
            console.log("response is not ok")
            return undefined
        }
        else {
            console.log("working")
            return response.json()
        }
    }).catch(e => {
        console.log("Error: e")
        return undefined
    }) 
    
    
}

