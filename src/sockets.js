import { Socket } from "rete";

export default {
  num: new Socket("Number value"),
  state: new Socket('State'),
  skeleton: new Socket('Skeleton'),
  transition: new Socket('Transition'),
  // action: new Socket('Action'),
  // data: new Socket('Data'),
  // package: new Socket('Package')
};
