import { observer } from "mobx-react-lite";
import { PinType, DataConnection, ExecConnection, XY } from "@mg/core";
import colors from "tailwindcss/colors";
import UIStore from "ui/stores/UIStore";

interface ConnectionProps {
  connection: DataConnection<PinType> | ExecConnection;
  svgOffset: XY;
}

export const TYPE_COLORS: Record<PinType["name"], string> = {
  int: colors.teal[400],
  boolean: colors.red[600],
  string: colors.pink[500],
  float: colors.green[500],
  enum: colors.blue[600],
};

const Connection = observer(({ connection, svgOffset }: ConnectionProps) => {
  const color =
    connection instanceof DataConnection
      ? TYPE_COLORS[connection.type.name]
      : "#FFF";

  return (
    <line
      x1={connection.path.x1 - svgOffset.x}
      y1={connection.path.y1 - svgOffset.y}
      x2={connection.path.x2 - svgOffset.x}
      y2={connection.path.y2 - svgOffset.y}
      stroke={color}
      strokeOpacity={0.75}
      strokeWidth={2 * UIStore.zoom}
    />
  );
});

export default Connection;
