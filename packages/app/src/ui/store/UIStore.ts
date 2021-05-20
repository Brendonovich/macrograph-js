import { action, observable } from "mobx";
import { Pin, BaseNode, XY } from "@mg/core";

class UIStore {
  @observable mouseDragLocation?: XY;
  @observable draggingPin?: Pin;
  @observable selectedNode?: BaseNode;

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
}

export default new UIStore();
