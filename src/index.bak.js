import "./styles.css";
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import NumComponent from "./NumComponent";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

const numSocket = new Rete.Socket("Number value");

const container = document.querySelector("#rete");
const editor = new Rete.NodeEditor("demo@0.1.0", container);

editor.use(ConnectionPlugin);
editor.use(VueRenderPlugin);

const numComponent = new NumComponent(numSocket);
editor.register(numComponent);

const engine = new Rete.Engine("demo@0.1.0");
engine.register(numComponent);

editor.on(
  "process nodecreated noderemoved connectioncreated connectionremoved",
  async () => {
    await engine.abort();
    await engine.process(editor.toJSON());
  }
);
