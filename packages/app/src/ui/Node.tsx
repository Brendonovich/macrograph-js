import React, { useCallback, useRef } from "react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

import { BaseNode, PinType } from "@mg/core";
import DataPin from "./pins/DataPin";
import ExecPin from "./pins/ExecPin";
import DataPinInput from "./pins/DataPinInput";
import UIStore from "./stores/UIStore";
import GraphStore from "./stores/GraphStore";

export const TYPE_COLORS: Record<PinType["name"], string> = {
  int: `border-teal-400 hover:bg-teal-400`,
  boolean: `border-red-600 hover:bg-red-600`,
  string: `border-pink-500 hover:bg-pink-500`,
  float: `border-green-500 hover:bg-green-500`,
  enum: `border-blue-600 hover:bg-blue-600`,
};
const HEADER_COLOR: Record<string, string> = {
  base: "bg-gray-500",
  exec: "bg-blue-600",
  pure: "bg-green-600",
  event: "bg-red-700",
};

interface Props {
  node: BaseNode;
}

const Node = observer(({ node }: Props) => {
  const mouseDownPos = useRef<number[] | null>(null);

  const mouseCallback = useCallback(
    (e: MouseEvent) => {
      if (mouseDownPos.current !== null) {
        const offset = mouseDownPos.current;
        node.setPosition({
          x: e.clientX - offset[0],
          y: e.clientY - offset[1],
        });
      }
    },
    [node]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case "Backspace":
        case "Delete": {
          UIStore.selectedNode = undefined;
          GraphStore.graph.deleteNode(node);
          break;
        }
      }
    },
    [node]
  );

  return (
    <div
      className="absolute flex flex-col border-2 border-opacity-75 border-black rounded-md text-white overflow-hidden shadow group focus:outline-none whitespace-nowrap"
      style={{
        transform: `translate(${node.position.x}px, ${node.position.y}px)`,
        minWidth: 100,
        boxShadow: clsx(
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          node.selected && ", 0 0 1px 2px #e3a008"
        ),
        backgroundColor: "rgba(0, 0, 0, 75%)",
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className={clsx(
          "px-2 h-6 cursor-pointer text-left",
          HEADER_COLOR[node.__variant]
        )}
        onMouseDown={(e) => {
          e.stopPropagation();
          UIStore.setSelectedNode(node);
          window.addEventListener("mousemove", mouseCallback);
          mouseDownPos.current = [
            e.clientX - node.position.x,
            e.clientY - node.position.y,
          ];

          const upListener = () => {
            window.removeEventListener("mousemove", mouseCallback);
            mouseDownPos.current = null;
            window.removeEventListener("mouseup", upListener);
          };

          window.addEventListener("mouseup", upListener);
        }}
      >
        {node.name}
      </div>
      <div className="flex flex-1 space-x-4 p-2">
        <div className="flex flex-1 flex-col items-start space-y-2">
          {node.inputExecPins.map((pin) => (
            <ExecPin key={pin.id} {...{ node, pin }} />
          ))}
          {node.inputDataPins.map((pin) => (
            <div
              key={pin.id}
              className="flex flex-row justify-start items-center space-x-2"
            >
              <DataPin {...{ node, pin }} />
              <DataPinInput pin={pin} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col items-end space-y-2">
          {node.outputExecPins.map((pin) => (
            <ExecPin pin={pin} key={pin.id} />
          ))}
          {node.outputDataPins.map((pin) => (
            <DataPin pin={pin} key={pin.id} />
          ))}

          {node.handleAddPin && (
            <>
              <div className="flex-1" />
              <button
                className="h-6 px-1"
                onClick={(e) => {
                  e.stopPropagation();
                  node.handleAddPin!();
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                Add Pin <b>+</b>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default Node;
