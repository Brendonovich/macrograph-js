import { BaseNode } from "../nodes";
import { PinType } from "../pins";

export const nodeTypeVariants = <T extends Record<string, PinType>>(
  typeVariants: T,
  classDeclaration: <K extends keyof T>(
    name: K,
    type: T[K]
  ) => { name: string; nodeType: typeof BaseNode }
): Record<string, typeof BaseNode> =>
  Object.entries(typeVariants).reduce((acc, [typeName, typeVariant]) => {
    const { name, nodeType } = classDeclaration(typeName, typeVariant as any);

    return { ...acc, [name]: nodeType };
  }, {});
