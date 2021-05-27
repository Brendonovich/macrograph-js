import { runInAction } from "mobx";
import {
  RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { Pin } from "@mg/core";
import GraphStore from "ui/stores/GraphStore";
import UIStore from "ui/stores/UIStore";

export const usePin = (pin: Pin) => {
  const ref = useRef<HTMLDivElement>(null);

  const moveListener = useCallback((e: MouseEvent) => {
    UIStore.setMouseDragLocation({
      x: e.clientX - UIStore.translate.x,
      y: e.clientY - UIStore.translate.y,
    });
  }, []);

  const upListener = useCallback(() => {
    window.removeEventListener("mouseup", upListener);
    window.removeEventListener("mousemove", moveListener);
  }, [moveListener]);

  usePinLocation(pin, ref);

  const ret = useMemo(
    () => ({
      props: {
        style: { pointerEvents: "all" } as const,
        onDoubleClick: () => GraphStore.graph.disconnectPin(pin),
        onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          UIStore.setDraggingPin(pin);

          window.addEventListener("mousemove", moveListener);
          window.addEventListener("mouseup", upListener);
        },
        onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          const draggingPin = UIStore.draggingPin;
          runInAction(() => {
            if (draggingPin) GraphStore.graph.connectPins(draggingPin, pin);
            UIStore.setDraggingPin();
          });
        },
      },
      ref,
    }),
    [moveListener, upListener, pin]
  );

  return ret;
};

export const usePinLocation = (pin: Pin, ref: RefObject<HTMLDivElement>) => {
  useLayoutEffect(() => {
    let rect = ref.current?.getBoundingClientRect()!;

    let viewportDims = UIStore.viewportSize || { width: 0, height: 0 };
    let zoom = UIStore.zoom;

    pin.setPosition({
      x: rect.x + rect.width / 2 - UIStore.translate.x,
      y: rect.y + rect.height / 2 - UIStore.translate.y,
    });
  });
};
