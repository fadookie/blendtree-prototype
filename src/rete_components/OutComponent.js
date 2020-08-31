import { Component, Input } from "rete";
import Socket from "../sockets";

export default class OutComponent extends Component {
  constructor() {
    super("Out");
    this.module = {
      nodeType: 'output',
      socket: Socket.skeleton,
    }
  }

  builder(node) {
    var inp = new Input("in", "Skeleton", Socket.skeleton);

    return node
      .addInput(inp);
  }
}
