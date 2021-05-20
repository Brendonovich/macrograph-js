import { pinIsData, XY } from "@mg/core";
import React from "react";
import { observer } from "mobx-react-lite";

import UIStore from "ui/store/UIStore";
import { TYPE_COLORS } from "./Connection";

interface ConnectionProps {
  svgOffset: XY;
}

const Connection = observer(({ svgOffset }: ConnectionProps) => {
  if (!UIStore.draggingPin || !UIStore.mouseDragLocation) return null;

  const color = pinIsData(UIStore.draggingPin)
    ? TYPE_COLORS[UIStore.draggingPin.type.name]
    : "#FFF";

  const pinLocation = UIStore.draggingPin.position;
  const mouseLocation = UIStore.mouseDragLocation;

  return (
    <line
      x1={mouseLocation.x - svgOffset.x}
      y1={mouseLocation.y - svgOffset.y}
      x2={pinLocation.x - svgOffset.x}
      y2={pinLocation.y - svgOffset.y}
      stroke={color}
      strokeOpacity={0.75}
      strokeWidth={2}
    />
  );
});

export default Connection;
