import { useLayoutEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { getPackages } from "@mg/core";

import Node from "./ui/graph/Node";
import GraphStore from "./ui/stores/GraphStore";
import ConnectionRenderer from "./ui/graph/connection/ConnectionRenderer";
import UIStore from "./ui/stores/UIStore";
import CreateNodeMenu from "./ui/graph/CreateNodeMenu";
import { DataEditors } from "./ui/sidebar/dataEditors";
import clsx from "clsx";

const App = observer(() => {
  const createNodeMenuPosition = UIStore.createNodeMenuPosition;

  const [panning, setPanning] = useState(false);
  const [waitingForPan, setWaitingForPan] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      let rect = viewportRef.current?.getBoundingClientRect()!;

      UIStore.viewportSize = {
        width: rect.width,
        height: rect.height,
      };
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-row select-none bg-gray-800 overflow-hidden">
      <div
        className={clsx("flex-1 h-full relative", panning && "cursor-move")}
        ref={viewportRef}
        onMouseUp={(e) => {
          if (panning) {
            setPanning(false);
            return;
          }

          switch (e.button) {
            case 0:
              UIStore.setDraggingPin();
              UIStore.setMouseDragLocation();
              break;
            case 2:
              const bounds = viewportRef.current!.getBoundingClientRect();
              UIStore.toggleCreateNodeMenu(
                createNodeMenuPosition
                  ? undefined
                  : {
                      x: e.clientX - 20 - bounds.x,
                      y: e.clientY - 20 - bounds.y,
                    }
              );
              setWaitingForPan(false);
              break;
          }
        }}
        onMouseDown={(e) => {
          UIStore.toggleCreateNodeMenu();
          switch (e.button) {
            case 0:
              UIStore.setSelectedNode();
              break;
            case 2:
              setWaitingForPan(true);
              break;
          }
        }}
        onMouseMove={(e) => {
          if (!waitingForPan && !panning) return;

          setWaitingForPan(false);
          setPanning(true);
          UIStore.translate.x += e.movementX;
          UIStore.translate.y += e.movementY;
        }}
      >
        <ConnectionRenderer />
        <div
          className="absolute inset-0 transform origin-top-left"
          style={{
            transform: `translate(${UIStore.translate.x}px, ${UIStore.translate.y}px) scale(${UIStore.zoom})`,
          }}
        >
          {GraphStore.graph.nodes.map((node) => (
            <Node node={node} key={node.id} />
          ))}
        </div>
        <button
          className="p-4 absolute l-0 t-0 bg-white"
          onClick={() => console.log(GraphStore.graph.toJSON())}
        >
          Save
        </button>
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
                  position: {
                    x:
                      createNodeMenuPosition.x -
                      UIStore.translate.x / UIStore.zoom,
                    y:
                      createNodeMenuPosition.y -
                      UIStore.translate.y / UIStore.zoom,
                  },
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
      <div className="w-96 z-10 bg-gray-700 border-l-4 border-gray-900 flex flex-col items-stretch text-white overflow-y-auto">
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
                <div className="p-2 space-y-4">
                  {UIStore.selectedNode.data.map((data) => {
                    //@ts-ignore
                    const Component = DataEditors[data.type.name];

                    return <Component key={data.name} data={data} />;
                  })}
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
