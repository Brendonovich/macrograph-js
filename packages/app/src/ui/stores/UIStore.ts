import { action, observable } from "mobx";
import { Pin, BaseNode, XY } from "@mg/core";

class UIStore {
  @observable mouseDragLocation?: XY;
  @observable draggingPin?: Pin;
  @observable selectedNode?: BaseNode;

  @observable zoom = 1;
  @observable translate = {
    x: 0,
    y: 0,
  };
  @observable viewportSize: { width: number; height: number } | null = null;
  @observable
  createNodeMenuPosition: XY | null = null;

  @action
  setMouseDragLocation(location?: XY) {
    this.mouseDragLocation = location;
  }

  @action
  setDraggingPin(pin?: Pin) {
    this.draggingPin?.setSelected(false);
    pin?.setSelected(true);

    this.draggingPin = pin;
  }

  @action
  setSelectedNode(node?: BaseNode) {
    this.selectedNode?.setSelected();
    node?.setSelected(true);

    this.selectedNode = node;
  }

  @action
  toggleCreateNodeMenu(position?: XY) {
    this.createNodeMenuPosition = position ?? null;
  }

  @action
  adjustZoom(amount: number): boolean {
    const newZoom = (this.zoom += amount);

    this.zoom = Math.max(0.5, Math.min(1.5, newZoom));

    return newZoom <= 1.5 && newZoom >= 0.5;
  }
}

export default new UIStore();
