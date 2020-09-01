import { animators, getT, duration, getLerpedSkeleton } from '../data/animationData';

const STATE_PLAYING = "playing";
const STATE_PAUSED = "paused";
const STATE_STOPPED = "stopped";
//to store json objects
function AnimationClip() {
    this.addOutput("", "skeleton");
    // this.addProperty("value", "");
    // this.widget = this.addWidget("text","json","","value");
    // this.widgets_up = true;
    // this.size = [140, 30];
    this.addProperty("CLIP", AnimationClip.values[0], "enum", { values: AnimationClip.values });
    this.addProperty("loop", true);
    this.loopWidget = this.addWidget("toggle","loop",this.properties.loop,"loop");
    // Using an ivar instead of a LGraphNode property so it doesn't get serialized
    this._playState = STATE_PLAYING;
    this.playingWidget = this.addWidget("string", "playing", this._isPlaying);
}

AnimationClip.title = "Animation Clip";
AnimationClip.desc = "Animation Clip";
AnimationClip.values = ["animator1", "animator2"];

AnimationClip.prototype.setPlayState = function(newState) {
  if (this.title === 'Animation Clip 2') 
    console.log('@@@ setIsPlaying:', newState);

  if (newState === this._playState) return;
  // switch(this._playState) {
  //   case STATE_PLAYING: {
  //     break;
  //   } case STATE_PAUSED: {
  //     break;
  //   } case STATE_STOPPED: {
  //     break;
  //   } default: {
  //     throw new Error(`Unrecognized state: ${this._playState}`);
  //   }
  // }
  if (newState === STATE_PLAYING && this._playState !== STATE_PAUSED) this._startTimeS = this.graph.globaltime;
  this._playState = newState;
  this.playingWidget.value = newState;
  this.setDirtyCanvas(true, true);
}

AnimationClip.prototype.setValue = function(v)
{
  this.setProperty("loop",v);
}

AnimationClip.prototype.onAction = function(action)
{
  console.log('@@@ onAction:', action);
}

AnimationClip["@CLIP"] = {
    type: "enum",
    title: "clip",
    values: AnimationClip.values
};

AnimationClip.prototype.onExecute = function() {
    if (this._startTimeS === undefined) this._startTimeS = this.graph.globaltime;
    const elapsedTimeS = this.graph.globaltime - this._startTimeS;
    let seekTime = elapsedTimeS / duration;
    const loop = this.properties.loop;
    if (seekTime > 1) {
      if (loop)  {
        seekTime = (elapsedTimeS % duration) / duration;
      } else {
        this.setPlayState(STATE_STOPPED);
      }
    }
    if (this._playState === STATE_STOPPED) {
      seekTime = 1;
    }
    const t = getT(seekTime * 1.5); //make triangle wave function loop
    const skeleton = getLerpedSkeleton(animators[this.properties.CLIP], t);
    if (this.title === 'Animation Clip 2') 
      console.log(this.title, { loop, elapsedTimeS, seekTime, t, playState: this._playState }, skeleton); 
    // this._value = skeleton;
    this.setOutputData(0, skeleton);
};

AnimationClip.prototype.onDrawBackground = function(ctx) {
  //show the current value
  this.outputs[0].label = this.properties.CLIP;
};

AnimationClip.prototype.pause = function(ctx) {
  if (this.title === 'Animation Clip 2') 
    console.log('@@@PAUSE');

  this.setPlayState(STATE_PAUSED);
}

AnimationClip.prototype.play = function(ctx) {
  if (this.title === 'Animation Clip 2') 
    console.log('@@@PLAY');

  this.setPlayState(STATE_PLAYING);
}

AnimationClip.prototype.resume = function(ctx) {
  if (this._playState === STATE_STOPPED) return;
  this.setPlayState(STATE_PLAYING);
}

// AnimationClip.prototype.setValue = function(v) {
//   this.setProperty("value",v);
// };

export default AnimationClip;