import 'regenerator-runtime/runtime';
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import Stage0RenderPlugin from 'rete-stage0-render-plugin';
import NumComponent from "./components/NumComponent";
import AddComponent from "./components/AddComponent";
import OutComponent from "./components/OutComponent";
import StateComponent from "./components/StateComponent";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import demoData from "./simple.json";
import './styles.css';
import 'rete-stage0-menu-plugin/build/stage0-menu-plugin.debug.css';
import 'rete-stage0-render-plugin/build/stage0-render-plugin.debug.css';

document.getElementById("app").innerHTML = `<h1>Blendtree Prototype</h1>`;

const STORAGE_KEY = 'BLENDTREE_PROTOTYPE_DOCUMENT';

(async () => {
  const container = document.querySelector("#rete");
  var components = [new NumComponent(), new AddComponent(), new OutComponent(), new StateComponent()];

  var editor = new Rete.NodeEditor("retejs@0.1.0", container);
  editor.use(ConnectionPlugin);//, { curvature: 0.4 });
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

  const data = (() => {
    const localDataString = localStorage.getItem(STORAGE_KEY);
    if (localDataString) return JSON.parse(localDataString) || demoData;
    return demoData;
  })();
  await editor.fromJSON(data);

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      await engine.abort();
      const data = editor.toJSON();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      await engine.process(data);
    }
  );

  editor.view.resize();
  AreaPlugin.zoomAt(editor);
  editor.trigger("process");
})();
