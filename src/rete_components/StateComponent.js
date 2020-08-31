import { Component, Input, Output } from "rete";
import Socket from "../sockets";
import Label from "../controls/Label";

export default class StateComponent extends Component {
  constructor() {
    super("State");
    this.state = 'STATE1';
  }

  builder(node) {
    var inp1 = new Input("inbound", "Transition", Socket.transition, true); // last argument - multiconnection 
    var out = new Output("outbound", "Transition", Socket.transition, true);

    // inp1.addControl(new Field(this.editor, "num1", "number"));

    return node
      .addInput(inp1)
      .addControl(new Label(this.editor, "preview", true))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    // var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;

    var n = this.editor.nodes.find((n) => n.id === node.id);
    if (n) n.controls.get("preview").setValue(this.state);
  }
}
