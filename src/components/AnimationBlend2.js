import invoke from 'lodash/invoke';
import { blendSkeletons } from '../data/animationData';
// import { approxLTE, approxGTE } from '../util/math';
import { greaterThanOrEquals, lessThanOrEquals } from 'float'

//your node constructor class
function AnimationBlend2()
{
  //add some input slots
  this.addInput("In","skeleton");
  this.addInput("Blend","skeleton");
  //add some output slots
  this.addOutput("Out","skeleton");
  //add some properties
  this.addProperty("weight", 0.5);
  this.widget = this.addWidget("slider","weight", this.properties.weight, v => this.setProperty('weight', v), { min: 0, max: 1 });
  // this.widgets_up = true;
}

//name to show on the canvas
AnimationBlend2.title = "Blend 2";

//function to call when the node is executed
AnimationBlend2.prototype.onExecute = function()
{
  //retrieve data from inputs
  var A = this.getInputData(0);
  if( A === undefined ) return;
  var B = this.getInputData(1);
  if( B === undefined ) return;
  //assing data to otputs
  this.setOutputData( 0, blendSkeletons(A, B, this.properties.weight) );

  // Cull graph, pause insignificant nodes
  // TODO make this recursive and generic
  const shallowAncestors = this.inputs.map(input =>
    this.graph.getNodeById(this.graph.links[input.link].origin_id));
  if (shallowAncestors[0] === shallowAncestors[1]) return; // someone is blending the same node with itself?

  // There are some precision errors with properties it seems, so use approx math
  if (lessThanOrEquals(this.properties.weight,0)) {
    if(shallowAncestors[1].pause) {
      shallowAncestors[1].pause(); // Should recursively update ancestors
    } else {
      //TODO recur
    }
    invoke(shallowAncestors[0], 'resume'); // Should resume if not playing, otherwise do nothing
  } else if (greaterThanOrEquals(this.properties.weight, 1)) {
    if(shallowAncestors[0].pause) {
      shallowAncestors[0].pause();
    } else {
      //TODO recur
    }
    invoke(shallowAncestors[1], 'resume');
  } else {
    invoke(shallowAncestors[0], 'resume');
    invoke(shallowAncestors[1], 'resume');
    //TODO recur
  }
}

export default AnimationBlend2;