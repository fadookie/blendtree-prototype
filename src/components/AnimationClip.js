	//to store json objects
  function AnimationClip() {
    this.addOutput("", "skeleton");
    // this.addProperty("value", "");
    // this.widget = this.addWidget("text","json","","value");
    // this.widgets_up = true;
    // this.size = [140, 30];
    this._value = null;
}

AnimationClip.title = "Const Data";
AnimationClip.desc = "Constant Data";

AnimationClip.prototype.onPropertyChanged = function(name, value) {
    this.widget.value = value;
    if (value == null || value == "") {
        return;
    }

    try {
        this._value = JSON.parse(value);
        this.boxcolor = "#AEA";
    } catch (err) {
        this.boxcolor = "red";
    }
};

AnimationClip.prototype.onExecute = function() {
    this.setOutputData(0, this._value);
};

AnimationClip.prototype.setValue = ConstantNumber.prototype.setValue;

export default AnimationClip;