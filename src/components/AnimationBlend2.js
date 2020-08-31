import { blendSkeletons } from '../data/animationData';

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
  this.widget = this.addWidget("number","weight",1,"weight");
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
}

export default AnimationBlend2;