import { BaseNode } from "../nodes";
import { t } from "../types";

type Variants = {
  [key: string]: t.ZodType<any, any, any>;
};

export const nodeTypeVariants = <V extends Variants>(
  typeVariants: V,
  classDeclaration: <K extends keyof V>(
    name: K,
    type: V[K]
  ) => { name: string; nodeType: typeof BaseNode }
): Record<string, typeof BaseNode> =>
  Object.entries(typeVariants).reduce((acc, [typeName, typeVariant]) => {
    const { name, nodeType } = classDeclaration(typeName, typeVariant as any);

    return { ...acc, [name]: nodeType };
  }, {});
