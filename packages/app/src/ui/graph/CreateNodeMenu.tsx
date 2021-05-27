import { observer } from "mobx-react-lite";
import  { useState } from "react";

import { NodeCategory } from "@mg/core";
import clsx from "clsx";

interface Category {
  name: string;
  contents: NodeCategory;
  onNodeClicked(node: string): void;
}

const Category = observer((props: Category) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-white text-left w-full space-y-1">
      <div
        className="hover:bg-gray-300 cursor-pointer hover:text-black rounded-sm px-2 flex flex-row items-center"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <svg
          className={clsx(
            "w-3 h-3 mr-2 inline transform transition-transform duration-100",
            open ? "rotate-180" : "rotate-90"
          )}
          viewBox="0 0 20 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            d="M8.26795 1C9.03775 -0.333333 10.9623 -0.333333 11.7321 1L19.5263 14.5C20.2961 15.8333 19.3338 17.5 17.7942 17.5H2.20577C0.666171 17.5 -0.29608 15.8333 0.47372 14.5L8.26795 1Z"
          />
        </svg>
        <p>{props.name}</p>
      </div>
      {open && (
        <div className="ml-4 space-y-1">
          {Object.entries(props.contents).map(([name, nodeOrPackage]) =>
            typeof nodeOrPackage === "function" ? (
              <p
                className="hover:bg-gray-300 cursor-pointer hover:text-black rounded-sm px-2"
                key={name}
                onMouseDown={(e) => e.stopPropagation()}
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
  items: Record<string, NodeCategory>;
}
const CreateNodeMenu = observer((props: Props) => (
  <div
    className="w-80 h-96 overflow-y-auto bg-gray-900 p-2 space-y-1 border-2 border-black rounded-md"
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
