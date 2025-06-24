export class Particle {
  private x: number;
  private y: number;

  private vx = 0;
  private vy = 0;

  private friction = 0.5;
  private ease = Math.random() * 0.2 + 0.01;

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private originX: number,
    private originY: number,
    private size: number,
  ) {
    this.x = canvas.width * 0.5;
    this.y = canvas.height * 0.5;
  }

  draw() {
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  update(x: number, y: number, radius: number) {
    const dx = x * 2 - this.x;
    const dy = y * 2 - this.y;
    const distance = dx ** 2 + dy ** 2;

    if (distance < radius) {
      const force = -Math.min(100, radius / distance);

      const angle = Math.atan2(dy, dx);
      this.vx += force * Math.cos(angle);
      this.vy += force * Math.sin(angle);
    }

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx + (this.originX - this.x) * this.ease;
    this.y += this.vy + (this.originY - this.y) * this.ease;
  }
}
