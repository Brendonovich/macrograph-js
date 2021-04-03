import { observable } from "mobx";
import { Graph } from "runtime/graph/Graph";

class GraphStore {
    graph = new Graph();
}

export default new GraphStore();
