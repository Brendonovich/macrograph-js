import { observer } from "mobx-react-lite";
import React, { useState } from "react";

import { Package } from "@mg/core";

interface Category {
  name: string;
  contents: Package;
  onNodeClicked(node: string): void;
}

const ItemStyle =
  "hover:bg-gray-300 cursor-pointer hover:text-black rounded-sm px-2";

const Category = observer((props: Category) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-white text-left w-full space-y-1">
      <p
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className={ItemStyle}
      >
        {open ? "v  " : ">  "} {props.name}
      </p>
      {open && (
        <div className="ml-4 space-y-1">
          {Object.entries(props.contents).map(([name, nodeOrPackage]) =>
            typeof nodeOrPackage === "function" ? (
              <p
                className={`${ItemStyle}`}
                key={name}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onNodeClicked(`${props.name}:${name}`);
                }}
              >
                {name}
              </p>
            ) : (
              <Category
                key={name}
                name={name}
                contents={nodeOrPackage}
                onNodeClicked={(type) =>
                  props.onNodeClicked(`${props.name}:${type}`)
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
});

export interface Props {
  onNodeClicked(type: string): void;
  items: Record<string, Package>;
}
const CreateNodeMenu = observer((props: Props) => (
  <div
    className="w-80 h-64 overflow-y-auto bg-gray-900 p-2 space-y-1 border-2 border-black rounded-md"
    onContextMenu={(e) => e.stopPropagation()}
  >
    {Object.entries(props.items).map(([category, nodesOrPackages]) => (
      <Category
        key={category}
        name={category}
        contents={nodesOrPackages}
        onNodeClicked={(type) => props.onNodeClicked(type)}
      />
    ))}
  </div>
));

export default CreateNodeMenu;
