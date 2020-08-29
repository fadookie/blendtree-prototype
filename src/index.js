import 'regenerator-runtime/runtime';
import _ from 'lodash';
import Rete from "rete";

import ConnectionPlugin from "rete-connection-plugin";
import Stage0RenderPlugin from 'rete-stage0-render-plugin';
import ContextMenuPlugin from "rete-context-menu-plugin";
import ConnectionPathPlugin from 'rete-connection-path-plugin';
import ModulePlugin from 'rete-module-plugin';
import AreaPlugin from "rete-area-plugin";

import NumComponent from "./components/NumComponent";
import AddComponent from "./components/AddComponent";
import OutComponent from "./components/OutComponent";
import StateComponent from "./components/StateComponent";
import StateMachineComponent from "./components/StateMachineComponent";
import ModuleComponent from './components/ModuleComponent';

// import demoData from "./data/simple.json";
import modulesData from './data/modulesData.json';

import './styles.css';
import 'rete-stage0-menu-plugin/build/stage0-menu-plugin.debug.css';
import 'rete-stage0-render-plugin/build/stage0-render-plugin.debug.css';

document.getElementById("app").innerHTML = `<h1>Blendtree Prototype</h1>`;

const STORAGE_KEY = 'BLENDTREE_PROTOTYPE_DOCUMENT';

console.log('@@@ localStorage:', JSON.parse(localStorage.getItem(STORAGE_KEY)));

var modules = Object.assign({}, modulesData, JSON.parse(localStorage.getItem(STORAGE_KEY)));
var currentModule = {};
var currentModuleId = 'index.rete';
var editor;

function setupModuleUI(moduleData) {
  const modules = document.getElementById('modules-list');
  _.forOwn(moduleData, (value, moduleId) => {
    let module = document.createElement('li');
    modules.appendChild(module);
    module.outerHTML = `<li id="li-${moduleId}">
      <a href="#" id="link-${moduleId}" moduleid="${moduleId}" onclick="openModule(this); return false;">${moduleId}</a>
    </li>`;
    module = document.getElementById(moduleId);
  }); 
}

async function openModule(moduleId) {
  // TODO where does currentModule come from?
  currentModule.data = editor.toJSON();
  
  currentModuleId = moduleId;
  currentModule = modules[moduleId];

  //   const localDataString = localStorage.getItem(STORAGE_KEY);
  //   if (localDataString) return JSON.parse(localDataString) || demoData;
  //   return demoData;
  await editor.fromJSON(currentModule.data);
  editor.trigger('process')
}
window.openModule = function(node) {
  openModule(node.getAttribute("moduleid"));
};

(async () => {
  const container = document.querySelector("#rete");
  var components = [
    new NumComponent(),
    new AddComponent(),
    new OutComponent(),
    new StateComponent(),
    new StateMachineComponent(),
    new ModuleComponent(),
  ];

  editor = new Rete.NodeEditor("retejs@0.1.0", container);
  editor.use(ConnectionPlugin);//, { curvature: 0 }); // TODO curvature has no effect?
  editor.use(Stage0RenderPlugin);
  editor.use(ContextMenuPlugin);

  editor.use(ConnectionPathPlugin, {
    type: ConnectionPathPlugin.DEFAULT, // DEFAULT or LINEAR transformer
    transformer: () => ([x1, y1, x2, y2]) => [[x1, y1], [x2, y2]], // optional, custom transformer
    curve: ConnectionPathPlugin.curveBundle, // curve identifier
    options: { vertical: false, curvature: 0.4 }, // optional
    arrow: { color: 'steelblue', marker: 'M-5,-10 L-5,10 L20,0 z' }
  });

  const engine = new Rete.Engine("retejs@0.1.0");

  editor.use(ModulePlugin, { engine, modules });
  setupModuleUI(modules);

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

  // const data = (() => {
  //   const localDataString = localStorage.getItem(STORAGE_KEY);
  //   if (localDataString) return JSON.parse(localDataString) || demoData;
  //   return demoData;
  // })();
  // await editor.fromJSON(data);

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      await engine.abort();
      currentModule.data = editor.toJSON();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
      await engine.process(currentModule.data);
    }
  );

  openModule(currentModuleId).then(() => {
    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger("process");
  });
})();
