import { Component, Input, Output } from "rete";
import Socket from "../sockets";
import Label from "../controls/Label";

// TODO use a module for this one
export default class StateMachineComponent extends Component {
  constructor() {
    super("StateMachine");
    this.state = 'STATE1';
  }

  builder(node) {
    var out = new Output("skeleton", "Skeleton", Socket.skeleton);

    // inp1.addControl(new Field(this.editor, "num1", "number"));

    return node
      .addControl(new Label(this.editor, "preview", true)) // TODO Should probably be a drop-down list
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    // var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;

    var n = this.editor.nodes.find((n) => n.id === node.id);
    if (n) n.controls.get("preview").setValue(this.state);

    outputs["skeleton"] = node.data.skeleton;
  }
}
