const sketch = graph => p5instance => {
  const p = p5instance;

  const drawSkeleton = (animator, strokeColor) => {
    p.push();
    p.stroke(strokeColor);
    p.translate(animator.bone1.v.x, animator.bone1.v.y);
    p.rotate(animator.bone1.r);
    p.line(0, 0, animator.bone2.v.x, animator.bone2.v.y);
    p.ellipse(0, 0, 10, 10);
    
    p.push();
    p.translate(animator.bone2.v.x, animator.bone2.v.y);
    p.rotate(animator.bone2.r);
    p.line(0, 0, animator.bone3.v.x, animator.bone3.v.y);
    p.ellipse(0, 0, 10, 10);
    
    
    p.push();
    p.translate(animator.bone3.v.x, animator.bone3.v.y);
    p.rotate(animator.bone3.r);
    p.ellipse(0, 0, 10, 10);
    p.pop();
    
    p.pop();
    
    p.pop();
  }

  p.setup = () => {
    p.createCanvas(600, 300);
    p.angleMode(p.DEGREES);
    // p.colorMode(p.HSB);
  };
  p.draw = () => {
    p.background(100);

    const anim1 = graph.getOutputData("anim1");
    drawSkeleton(anim1, 'red');

    const anim2 = graph.getOutputData("anim2");
    p.push();
    p.translate(150, 0);
    drawSkeleton(anim2, 'blue');
    p.pop();

    const blend = graph.getOutputData("blend");
    p.push();
    p.translate(350, 0);
    drawSkeleton(blend, 'yellow');
    p.pop();
  };
  p.mousePressed = (event) => {
    console.log('@@@ mousePressed:', { x: p.mouseX, y: p.mouseY });
  };
};
sketch.onFoo = () => {
  console.log('@@@ sketch#onFoo');
}

export default sketch;