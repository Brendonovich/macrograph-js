import { Graph } from "@mg/core";
import { graphSeed } from "seed";

class GraphStore {
  graph = Graph.fromJSON(graphSeed);
}

export default new GraphStore();
