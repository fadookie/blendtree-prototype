import pick from 'lodash/pick';
import { Vector } from 'p5';

export const animators = {};
let p5;

const makeKeyframe = (x, y, r = 0) => ({ v: p5.createVector(x, y), r });

export const init = p => {
  p5 = p;
  Vector.prototype.toJSON = function() {
    return pick(this, ['x', 'y', 'z']);
  };

  animators.animator1 = { 
    bone1: [makeKeyframe(120, 20),    makeKeyframe(120, 60, 45),    makeKeyframe(120, 20)],
    bone2: [makeKeyframe(40, 40, 0),  makeKeyframe(120, 120, 90),   makeKeyframe(40, 40, 0)],
    bone3: [makeKeyframe(40, 40),     makeKeyframe(120, 120),       makeKeyframe(40, 40)],
  };
  
  animators.animator2 = { 
    bone1: [makeKeyframe(120, 20),    makeKeyframe(200, 20, 45),    makeKeyframe(120, 20)],
    bone2: [makeKeyframe(40, 40, 0),  makeKeyframe(40, 40, -45),    makeKeyframe(40, 40, 0)],
    bone3: [makeKeyframe(40, 40),     makeKeyframe(40, 40),         makeKeyframe(40, 40)]
  };
  
};

export const duration = 3;

export const lerpKeyframe = (a, b, t) => {
  const vec = Vector.lerp(a.v, b.v, t);
  return makeKeyframe(vec.x, vec.y, p5.lerp(a.r, b.r, t));
}

export const getLerpedSkeleton = (animator, t) => {
  const numFrames = animator.bone1.length;
  const fromIndex = Math.min(Math.floor(t * numFrames), numFrames - 2);
  const toIndex = fromIndex + 1;
  const res = {
    bone1: lerpKeyframe(animator.bone1[fromIndex], animator.bone1[toIndex], t),
    bone2: lerpKeyframe(animator.bone2[fromIndex], animator.bone2[toIndex], t),
    bone3: lerpKeyframe(animator.bone3[fromIndex], animator.bone3[toIndex], t),    
  };
  return res;
};

// TODO: blend to buffer
export const blendSkeletons = (a, b, weight) => ({
  bone1: lerpKeyframe(a.bone1, b.bone1, weight),
  bone2: lerpKeyframe(a.bone2, b.bone2, weight),
  bone3: lerpKeyframe(a.bone3, b.bone3, weight),    
});
