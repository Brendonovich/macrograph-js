import { Graph } from "graph";
import { PinType } from "pins";

export * from "../index";

export declare interface NodeArgs {
  position: XY;
  name: string;
  type: string;
  id?: string;
  graph: Graph;
}

export declare interface XY {
  x: number;
  y: number;
}

export interface SerializedNode {
  name: string;
  type: string;
  position: XY;
  id: string;
  data?: Record<string, any>;
  pins: {
    data: {
      in: {
        id: string;
        unconnectedValue: any;
        connection?: {
          node: string;
          pin: string;
        };
      }[];
      out: string[];
    };
    exec: {
      in: {
        id: string;
        connection?: {
          node: string;
          pin: string;
        };
      }[];
      out: string[];
    };
  };
}

export interface SerializedGraph {
  nodes: SerializedNode[];
}
