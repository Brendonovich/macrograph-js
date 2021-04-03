import { action, observable } from "mobx";
import BaseNode from "runtime/nodes/BaseNode";
import { Pin } from "runtime/pins";

class UIStore {
  @observable mouseDragLocation?: XY;
  @observable draggingPin?: Pin;
  @observable selectedNode?: BaseNode;

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
}

export default new UIStore();
