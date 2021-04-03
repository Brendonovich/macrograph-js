import { observer } from "mobx-react-lite";
import React from "react";

import { TestNode } from "packages/util/Test";
import Node from "ui/Node";
import { LogNode } from "packages/util/Log";
import GraphStore from "./store/GraphStore";
import ConnectionRenderer from "./connection/ConnectionRenderer";
import UIStore from "./store/UIStore";

const test = new TestNode({ position: { x: 0, y: 0 } });
const log = new LogNode({ position: { x: 0, y: 0 } });

GraphStore.graph.addNode(test);
GraphStore.graph.addNode(log);

GraphStore.graph.connectDataPins(test.valueOutput, log.valueInput);
GraphStore.graph.connectExecPins(test.execOutput, log.execInput);

const App = observer(() => {
  return (
    <div
      className="w-screen h-screen select-none bg-gray-800"
      onMouseUp={() => {
        UIStore.setMouseDragLocation();
        UIStore.setDraggingPin();
      }}
      onMouseDown={() => {
        UIStore.setSelectedNode();
      }}
    >
      <ConnectionRenderer />
      {GraphStore.graph.nodes.map((node) => (
        <Node node={node} key={node.id} />
      ))}
    </div>
  );
});

export default App;
