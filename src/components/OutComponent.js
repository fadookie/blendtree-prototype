import { Component, Input } from "rete";
import Socket from "../sockets";
import NumControl from "../controls/NumControl";

const DefaultControl = NumControl;

export default class OutComponent extends Component {
  constructor(CustomFieldControl) {
    super("Out");
    this.CustomFieldControl = CustomFieldControl;
  }

  builder(node) {
    var Field = this.CustomFieldControl || DefaultControl;
    var inp1 = new Input("num1", "Number", Socket.num);

    inp1.addControl(new Field(this.editor, "num1", "number"));

    return node
      .addInput(inp1)
      .addControl(new Field(this.editor, "preview", "number", true));
  }

  worker(node, inputs, outputs) {
    var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;

    var n = this.editor.nodes.find((n) => n.id === node.id);
    if (n) n.controls.get("preview").setValue(n1);
  }
}
