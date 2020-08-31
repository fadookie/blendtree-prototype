const sketch = (p5instance) => {
  const p = p5instance;
  p.setup = () => {
    p.createCanvas(600, 300);
    // p.colorMode(p.HSB);
  };
  p.draw = () => {
    p.background(100);
    p.ellipse(40, 40, 40, 40);
  };
  p.mousePressed = (event) => {
    console.log('@@@ mousePressed:', { x: p.mouseX, y: p.mouseY });
  };
};
sketch.onFoo = () => {
  console.log('@@@ sketch#onFoo');
}

export default sketch;