import { Effect } from './Effect.ts';
import { Renderer } from './Renderer.ts';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
const ctx = canvas.getContext('2d', {
  willReadFrequently: true,
})!;

const pointer = {
  x: 0,
  y: 0,
  radius: 10000 * 2 ** 2,
};
window.addEventListener('pointermove', (e) => {
  pointer.x = e.x;
  pointer.y = e.y;
});

const renderer = new Renderer(canvas, ctx);
const effect = new Effect(canvas, ctx);

renderer.renderText('Hello, World!');
effect.convertToParticles();

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(pointer.x, pointer.y, pointer.radius);
  requestAnimationFrame(animate);
})();

const renderText = debounce(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderer.renderText('Hello, World!');
  effect.convertToParticles();
});
const resizeCanvas = () => {
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  renderText();
};
window.addEventListener('resize', resizeCanvas);

function debounce(callback: () => void) {
  let timer: number;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, 100);
  };
}
