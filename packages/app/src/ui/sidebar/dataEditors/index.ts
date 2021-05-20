import { BaseNode } from "@mg/core";
import { observer } from "mobx-react-lite";
import React from "react";

export interface DataRendererProps<V, N extends BaseNode> {
  node: N;
  value: V;
  name: string;
}

export const dataRenderers: Record<
  string,
  React.FC<DataRendererProps<any, any>>
> = {};

export const registerDataRenderer = <T, N extends BaseNode>(
  name: string,
  component: React.FC<DataRendererProps<T, N>>
) => {
  dataRenderers[name] = observer(component);
};
