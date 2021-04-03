import { action, observable } from "mobx";
import BaseNode from "runtime/nodes/BaseNode";
import { nanoid } from "nanoid";

export default abstract class BasePin {
  name: string;
  id = nanoid(8);

  @observable selected = false;
  @observable position: XY = { x: 0, y: 0 };

  abstract disconnect(): void;

  constructor(args: { name: string; id?: string }, public node: BaseNode) {
    this.name = args.name;
    if (args.id) this.id = args.id;
  }

  @action
  setSelected(selected: boolean) {
    this.selected = selected;
  }

  @action
  setPosition(pos: XY) {
    this.position = pos;
  }
}
