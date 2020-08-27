import Rete from "rete";

const Stage0NumControl = {
  template: '<input type="number"/>',
  data() {
    return {
      value: 0
    };
  },
  methods: {
    update() {
      if (this.root) {
        this.putData(this.ikey, +this.root.value);
      }

      this.emitter.trigger("process");
    }
  },
  mounted() {
    const _self = this;

    this.root.value = this.getData(this.ikey);

    this.root.onkeyup = function(e) {
      _self.root.update();
    };

    this.root.onmouseup = function(e) {
      _self.root.update();
    };

    this.root.ondblclick = function(e) {
      e.stopPropagation();
    };
  }
};

export default class NumControl extends Rete.Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.component = Stage0NumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.stage0Context.root.value = val; // TODO get rid of stage0Context
  }
}