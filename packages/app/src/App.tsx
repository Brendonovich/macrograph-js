import React from "react";
import { observer } from "mobx-react-lite";
import { getPackages } from "@mg/core";

import Node from "./ui/Node";
import GraphStore from "./ui/stores/GraphStore";
import ConnectionRenderer from "./ui/connection/ConnectionRenderer";
import UIStore from "./ui/stores/UIStore";
import CreateNodeMenu from "./ui/graph/CreateNodeMenu";
import { dataRenderers } from "./ui/sidebar/dataEditors";

const App = observer(() => {
  const createNodeMenuPosition = UIStore.createNodeMenuPosition;

  return (
    <div className="w-screen h-screen select-none bg-gray-800 flex flex-row">
      <div
        className="flex-1 h-full relative"
        onContextMenu={(e) => {
          e.preventDefault();

          UIStore.toggleCreateNodeMenu(
            createNodeMenuPosition
              ? undefined
              : { x: e.clientX - 20, y: e.clientY - 20 }
          );
        }}
        onClick={() => {
          UIStore.toggleCreateNodeMenu();
        }}
        onMouseUp={() => {
          UIStore.setMouseDragLocation();
          UIStore.setDraggingPin();
        }}
        onMouseDown={() => {
          UIStore.setSelectedNode();
        }}
      >
        <ConnectionRenderer />
        <button
          className="p-4 l-10 t-10 absolute bg-white"
          onClick={() => console.log(GraphStore.graph.toJSON())}
        >
          Save
        </button>
        {GraphStore.graph.nodes.map((node) => (
          <Node node={node} key={node.id} />
        ))}
        {createNodeMenuPosition && (
          <div
            className="absolute"
            style={{
              top: createNodeMenuPosition.y,
              left: createNodeMenuPosition.x,
            }}
          >
            <CreateNodeMenu
              onNodeClicked={(type) => {
                GraphStore.graph.createNode({
                  position: createNodeMenuPosition,
                  type,
                });
                UIStore.toggleCreateNodeMenu();
              }}
              items={Object.entries(getPackages()).reduce(
                (acc, [name, { nodes }]) => ({ ...acc, [name]: nodes }),
                {}
              )}
            />
          </div>
        )}
      </div>
      <div className="w-96 z-10 bg-gray-700 border-l-4 border-gray-900 flex flex-col items-stretch text-white">
        {UIStore.selectedNode && (
          <>
            <div className="p-2">
              <input
                className="text-2xl text-black font-bold w-full px-2 py-1 rounded-md bg-gray-200"
                value={UIStore.selectedNode.name}
                onChange={(e) => (UIStore.selectedNode!.name = e.target.value)}
              />
            </div>
            {UIStore.selectedNode.data && (
              <>
                <span className="text-xl font-semibold w-full px-2 py-1 bg-gray-800">
                  Data
                </span>
                <div className="p-2">
                  {Object.entries(UIStore.selectedNode.data).map(
                    ([name, value]) => {
                      const Component = dataRenderers[name];

                      return (
                        <Component
                          key={name}
                          node={UIStore.selectedNode!}
                          name={name}
                          value={value}
                        />
                      );
                    }
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default App;
