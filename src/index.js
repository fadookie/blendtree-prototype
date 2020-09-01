import omit from 'lodash/fp/omit';
import { LiteGraph, LGraph, LGraphCanvas } from 'litegraph.js';
import P5 from 'p5';
import MyAddNode from './components/MyAddNode';
import AnimationClip from './components/AnimationClip';
import AnimationBlend2 from './components/AnimationBlend2';
import sketch from './sketch';
import basicData from './data/basic.json';
import { init as initAnimationData } from './data/animationData';

import './styles.css';
import 'litegraph.js/css/litegraph.css';

//register in the system, also makes it inherit from LiteGraphNode
LiteGraph.registerNodeType("eliot/myaddnode", MyAddNode);
LiteGraph.registerNodeType("geckolib/AnimationClip", AnimationClip);
LiteGraph.registerNodeType("geckolib/Blend2", AnimationBlend2);

const LOCAL_STORAGE_KEY = 'BLENDTREE_PROTOTYPE_GRAPH';
const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || 'false') || basicData;

const graph = new LGraph(cleanGraphData(savedData));
window.LGraph = LGraph;

const canvas = new LGraphCanvas("#mycanvas", graph);

const p5 = new P5(sketch(graph), document.getElementById("sketch"));
initAnimationData(p5);

// var node_const = LiteGraph.createNode("basic/const");
// node_const.pos = [200,200];
// graph.add(node_const);
// node_const.setValue(4.5);

// var node_watch = LiteGraph.createNode("basic/watch");
// node_watch.pos = [700,200];
// graph.add(node_watch);

// node_const.connect(0, node_watch, 0 );

graph.start();

// Poll for updates unless I find a better way of doing this
const outputText = document.getElementById("output-text");
setInterval(() => {
	const outputName = 'anim2';
	// render json preview
	const graphJson = JSON.stringify(graph.getOutputData(outputName), null, 2);
	outputText.innerText = `${outputName}:
${graphJson}`;

	//persist graph
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanGraphData(graph.serialize())));
}, 1000);

document.getElementById("download").addEventListener("click", () => {
	var data = JSON.stringify(graph.serialize(), null, 2);
	var file = new Blob([ data ]);
	var url = URL.createObjectURL(file);
	var element = document.createElement("a");
	element.setAttribute('href', url);
	element.setAttribute('download', "graph.json");
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
	setTimeout( function(){ URL.revokeObjectURL( url ); }, 1000*60 ); //wait one minute to revoke url	
});

document.getElementById("demo").addEventListener("click", () => {
	graph.configure(cleanGraphData(basicData));
	graph.start();
});

document.getElementById("clear").addEventListener("click", () => {
	graph.clear();
});

function cleanGraphData(data) {
	return Object.assign({}, data, { nodes: data.nodes.map(omit(['size'])) });
}