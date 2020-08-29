import { Component } from "rete";
import TextControl from '../controls/TextControl';
import Socket from "../sockets";

export default class ModuleComponent extends Component {

  constructor() {
      super("Module");
      this.module = {
          nodeType: 'module',
          socket: Socket.skeleton,
      }
  }

  builder(node) {
      var ctrl = new TextControl(this.editor, 'module', {value: 'Module name..'}); // the key must be 'module'
      ctrl.onChange = () => {
          this.updateModuleSockets(node);
          node.update();
      }
      return node.addControl(ctrl);
  }

  change(node, item) {
      node.data.module = item;
      this.editor.trigger('process');
  }
}
