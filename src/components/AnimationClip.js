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
    this.playingWidget = this.addWidget("string", "playing", this._playState);
    this._lastSeekTimeNorm = 0;
    // this.size = [200, 200];
}

AnimationClip.title = "Animation Clip";
AnimationClip.desc = "Animation Clip";
AnimationClip.values = ["animator1", "animator2"];

AnimationClip.prototype.setValue = function(v)
{
  this.setProperty("loop",v);
}

///#region LGraphNode Callbacks

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
    const loop = this.properties.loop;

    // Calculate current normalized playback seek time (may be > 1)
    let seekTimeNorm;
    switch(this._playState) {
      case STATE_PLAYING:
      case STATE_STOPPED: {
        seekTimeNorm = elapsedTimeS / duration;
        break;
      } case STATE_PAUSED: {
        seekTimeNorm = this._lastSeekTimeNorm;
        break;
      } default: {
        throw new Error(`Unrecognized state: ${this._playState}`);
      }
    }

    // Clamp/wrap if needed
    if (seekTimeNorm > 1) {
      if (loop)  {
        seekTimeNorm = (elapsedTimeS % duration) / duration;
      } else {
        this.setPlayState(STATE_STOPPED);
        seekTimeNorm = 1;
      }
    }

    this._lastSeekTimeNorm = seekTimeNorm;

    const t = getT(seekTimeNorm * 1.5); //make triangle wave function loop
    const skeleton = getLerpedSkeleton(animators[this.properties.CLIP], t);
    if (this.title === 'Animation Clip 2' && seekTimeNorm < 0.1) 
      console.log(this.title, { loop, elapsedTimeS, seekTime: seekTimeNorm, t, playState: this._playState }, skeleton); 
    // this._value = skeleton;
    this.setOutputData(0, skeleton);
};

AnimationClip.prototype.onDrawBackground = function(ctx) {
  //show the current value
  this.outputs[0].label = this.properties.CLIP;
};

 AnimationClip.prototype.onPropertyChanged = function(name, value) {
  const widget = this.widgets.find(w => w.options.property == name);
  if (widget) widget.value = value;
  if (name === "loop" && !!value && this._playState === STATE_STOPPED) this.setPlayState(STATE_PLAYING);
 };

//#endregion LGraphNode Callbacks

AnimationClip.prototype.setPlayState = function(newState) {
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

  if (this.title === 'Animation Clip 2')
    console.log('@@@ setIsPlaying unique:', newState);

  if (newState === STATE_PLAYING && this._playState !== STATE_PAUSED) this._startTimeS = this.graph.globaltime;
  this._playState = newState;
  this.playingWidget.value = newState;
  // this.setDirtyCanvas(true, true);
}

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