import _ from 'lodash';
import { LiteGraph, LGraph, LGraphCanvas } from 'litegraph.js';
import P5 from 'p5';
import MyAddNode from './components/MyAddNode';
import sketch from './sketch';

import './styles.css';
import 'litegraph.js/css/litegraph.css';

new P5(sketch, document.getElementById("sketch"));

//register in the system, also makes it inherit from LiteGraphNode
LiteGraph.registerNodeType("eliot/myaddnode", MyAddNode );

var graph = new LGraph();

var canvas = new LGraphCanvas("#mycanvas", graph);

var node_const = LiteGraph.createNode("basic/const");
node_const.pos = [200,200];
graph.add(node_const);
node_const.setValue(4.5);

var node_watch = LiteGraph.createNode("basic/watch");
node_watch.pos = [700,200];
graph.add(node_watch);

node_const.connect(0, node_watch, 0 );

graph.start();