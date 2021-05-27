import  { useRef, useState, useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import GraphStore from "ui/stores/GraphStore";
import Connection from "./Connection";
import MouseConnection from "./MouseConnection";
import { XY } from "@mg/core";
import UIStore from "ui/stores/UIStore";

const ConnectionRenderer = observer(({ onClick }: any) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [svgOffset, setSvgOffset] = useState<XY>({
    x: 0,
    y: 0,
  });

  useLayoutEffect(() => {
    const rect = svgRef.current?.getBoundingClientRect()!;
    setSvgOffset({
      x: rect.x,
      y: rect.y,
    });

    window.addEventListener("resize", () => {
      const rect = svgRef.current?.getBoundingClientRect()!;
      setSvgOffset({
        x: rect.x,
        y: rect.y,
      });
    });
  }, []);

  return (
    <div className="absolute inset-0">
      <svg
        ref={svgRef}
        viewBox={`0 0
        ${svgRef.current?.clientWidth || 0} ${
          svgRef.current?.clientHeight || 0
        }`}
        className="w-full h-full transform"
        onClick={onClick}
      >
        <g
          className="origin-top-left"
          style={{
            transform: `translate(${UIStore.translate.x}px, ${UIStore.translate.y}px) scale(${UIStore.zoom})`,
          }}
        >
          {GraphStore.graph.connections.map((c) => (
            <Connection connection={c} svgOffset={svgOffset} key={c.id} />
          ))}
          <MouseConnection svgOffset={svgOffset} />
        </g>
      </svg>
    </div>
  );
});

export default ConnectionRenderer;
