import React, { useRef, useState, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import GraphStore from "ui/store/GraphStore";
import Connection from "./Connection";
import MouseConnection from "./MouseConnection";

const ConnectionRenderer = observer(({ onClick }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [svgOffset, setSvgOffset] = useState<XY>({
    x: 0,
    y: 0,
  });

  useLayoutEffect(() => {
    setSvgOffset(svgRef.current?.getBoundingClientRect()!);

    window.addEventListener("resize", () => {
      setSvgOffset(svgRef.current?.getBoundingClientRect()!);
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${svgRef.current?.clientWidth || 0} ${
        svgRef.current?.clientHeight || 0
      }`}
      className="absolute w-full h-full"
      onClick={onClick}
    >
      {GraphStore.graph.connections.map((c) => (
        <Connection connection={c} svgOffset={svgOffset} key={c.id} />
      ))}
      <MouseConnection svgOffset={svgOffset} />
    </svg>
  );
});

export default ConnectionRenderer;
