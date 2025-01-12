import { Particle } from './Particle.ts';

export class Effect {
  private particles: Particle[] = [];
  private gap: number = 8;

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D
  ) {}

  convertToParticles() {
    this.particles = [];

    const pixels = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    ).data;

    for (let y = 0; y < this.canvas.height; y += this.gap) {
      for (let x = 0; x < this.canvas.width; x += this.gap) {
        const index = (y * this.canvas.width + x) * 4;
        const alpha = pixels[index + 3];

        if (alpha > 0) {
          this.particles.push(
            new Particle(this.canvas, this.ctx, x, y, this.gap * 0.8)
          );
        }
      }
    }
  }

  render(x: number, y: number, radius: number) {
    this.particles.forEach((particle) => {
      particle.update(x, y, radius);
      particle.draw();
    });
  }
}
