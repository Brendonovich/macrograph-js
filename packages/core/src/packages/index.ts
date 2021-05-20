import { BaseNode } from "nodes";

interface PackageArgs {
  name: string;
  nodes: Package;
}

export interface Package {
  [key: string]: typeof BaseNode | Package;
}

const packages: Record<string, Package> = {};

export const registerPackage = (args: PackageArgs) => {
  packages[args.name] = args.nodes;
};

export const getPackages = () => packages;

export const findNodeType = (
  type: string
): { name: string; type: typeof BaseNode } => {
  const paths = type.split(":");

  // @ts-expect-error
  const nodeType = paths.reduce<Package>((subPackage, path) => {
    const nodeOrPackage = subPackage[path];
    if (nodeOrPackage === undefined)
      throw new Error(`Node with type ${type} not found!`);

    return nodeOrPackage;
  }, packages);

  if (typeof nodeType !== "function")
    throw new Error(`Node with type ${type} not found!`);

  return { name: paths[paths.length - 1], type: nodeType };
};
