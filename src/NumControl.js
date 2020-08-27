import Rete from "rete";

export default class NumControl extends Rete.Control {
  constructor(emitter, key, type, readonly) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.template =
      '<input type="number" :readonly="readonly" :value="value" @input="change($event)"/>';
    this.props = { emitter, ikey: key, type, readonly };

    this.scope = {
      value: 0,
      readonly,
      change: this.change.bind(this)
    };
  }

  change(e) {
    this.scope.value = +e.target.value;
    this.update();
  }

  update() {
    if (this.key) this.putData(this.key, this.scope.value);
    this.emitter.trigger("process");
    this._alight.scan();
  }

  mounted() {
    this.scope.value = this.getData(this.key) || 0;
    this.update();
  }

  setValue(val) {
    this.scope.value = val;
    this._alight.scan();
  }
}
