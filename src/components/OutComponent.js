import { Component, Input } from "rete";
import Socket from "../sockets";

export default class OutComponent extends Component {
  constructor() {
    super("Out");
  }

  builder(node) {
    var inp1 = new Input("in", "Skeleton", Socket.skeleton);

    return node
      .addInput(inp1);
  }

  worker(node, inputs, outputs) {
    // var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;

    // var n = this.editor.nodes.find((n) => n.id === node.id);
    // if (n) n.controls.get("preview").setValue(n1);
  }
}
