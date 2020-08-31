import { animators, getT, getLerpedSkeleton } from '../data/animationData';

//to store json objects
function AnimationClip() {
    this.addOutput("", "skeleton");
    // this.addProperty("value", "");
    // this.widget = this.addWidget("text","json","","value");
    // this.widgets_up = true;
    // this.size = [140, 30];
    this.addProperty("CLIP", AnimationClip.values[0], "enum", { values: AnimationClip.values });
    this._value = null;
}

AnimationClip.title = "Animation Clip";
AnimationClip.desc = "Animation Clip";
AnimationClip.values = ["animator1", "animator2"];

AnimationClip["@CLIP"] = {
    type: "enum",
    title: "clip",
    values: AnimationClip.values
};

// AnimationClip.prototype.onPropertyChanged = function(name, value) {
//     this.widget.value = value;
//     if (value == null || value == "") {
//         return;
//     }

//     try {
//         this._value = JSON.parse(value);
//         this.boxcolor = "#AEA";
//     } catch (err) {
//         this.boxcolor = "red";
//     }
// };

AnimationClip.prototype.onExecute = function() {
    if (this._startTimeS === undefined) this._startTimeS = this.graph.globaltime;
    const elapsedTimeS = this.graph.globaltime - this._startTimeS;
    const t = getT(elapsedTimeS);
    const skeleton = getLerpedSkeleton(animators[this.properties.CLIP], t);
    this._value = skeleton;
    this.setOutputData(0, this._value);
};

AnimationClip.prototype.onDrawBackground = function(ctx) {
  //show the current value
  this.outputs[0].label = this.properties.CLIP;
};

// AnimationClip.prototype.setValue = function(v) {
//   this.setProperty("value",v);
// };

export default AnimationClip;