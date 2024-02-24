import * as Modules from './types/modules';
declare class GraphNode {
    constructor(Module: Modules.Module, preReqs: GraphNode[], Unlocks: GraphNode[]);
}
export default GraphNode;
