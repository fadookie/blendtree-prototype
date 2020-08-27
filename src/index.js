import 'regenerator-runtime/runtime';
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import Stage0RenderPlugin from 'rete-stage0-render-plugin';
// import VueRenderPlugin from "rete-vue-render-plugin";
// import ReactRenderPlugin from "rete-react-render-plugin";
// import AlightRenderPlugin from "rete-alight-render-plugin";
import NumComponent from "./NumComponent";
import AddComponent from "./AddComponent";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import data from "./simple.json";

document.getElementById("app").innerHTML = `<h1>Blendtree Prototype</h1>`;

(async (container) => {
  var components = [new NumComponent(), new AddComponent()];

  var editor = new Rete.NodeEditor("retejs@0.1.0", container);
  editor.use(ConnectionPlugin);//, { curvature: 0.4 });
  // editor.use(AlightRenderPlugin);
  // editor.use(VueRenderPlugin);
  // editor.use(ReactRenderPlugin);
  editor.use(Stage0RenderPlugin);
  editor.use(ContextMenuPlugin);

  var engine = new Rete.Engine("retejs@0.1.0");

  components.map((c) => {
    editor.register(c);
    engine.register(c);
  });

  // var n1 = await components[0].createNode({ num: 2 });
  // var n2 = await components[0].createNode({ num: 0 });
  // var add = await components[1].createNode();

  // n1.position = [0, 0];
  // n2.position = [80, 200];
  // add.position = [300, 300];

  // editor.addNode(n1);
  // editor.addNode(n2);
  // editor.addNode(add);

  // editor.connect(n1.outputs[0], add.inputs[0]);
  // editor.connect(n2.outputs[0], add.inputs[1]);

  // console.log(editor.toJSON());

  console.log("DATA", data);
  await editor.fromJSON(data);

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );

  editor.view.resize();
  AreaPlugin.zoomAt(editor);
  editor.trigger("process");
})(document.querySelector("#rete"));
