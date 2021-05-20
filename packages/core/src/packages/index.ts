import { BaseNode } from "nodes";
import { BaseEngine } from "types";

interface PackageArgs {
  name: string;
  nodes: NodeCategory;
  engine?: BaseEngine;
}

export interface NodeCategory {
  [key: string]: typeof BaseNode | NodeCategory;
}

export interface Package {
  engine?: BaseEngine;
  nodes: NodeCategory;
}

const packages: Record<string, Package> = {};

export const registerPackage = (args: PackageArgs) => {
  packages[args.name] = { engine: args.engine, nodes: args.nodes };
};

export const getPackages = () => packages;

export const findNodeType = (
  type: string
): { name: string; type: typeof BaseNode } => {
  const [pkg, ...paths] = type.split(":");

  // @ts-expect-error
  const nodeType = paths.reduce<NodeCategory>((subPackage, path) => {
    const nodeOrPackage = subPackage[path];
    if (nodeOrPackage === undefined)
      throw new Error(`Node with type ${type} not found!`);

    return nodeOrPackage;
  }, packages[pkg].nodes);

  if (typeof nodeType !== "function")
    throw new Error(`Node with type ${type} not found!`);

  return { name: paths[paths.length - 1], type: nodeType };
};
