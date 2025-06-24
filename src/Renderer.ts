export class Renderer {
  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
  ) {}

  renderText(text: string) {
    const maxTextWidth = this.canvas.width * 0.9;

    const fontSize = 100 * 2;
    this.ctx.fillStyle = 'white';
    this.ctx.font = `${fontSize}px Roboto, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;
    this.ctx.letterSpacing = '0.125em';
    this.ctx.textAlign = 'center';

    const words = text.split(' ');
    const linesArray = [];
    let lineCounter = 0;
    let line = '';

    for (const word of words) {
      const temp = line + word + ' ';

      if (this.ctx.measureText(temp).width > maxTextWidth) {
        line = word + ' ';
        lineCounter++;
      } else {
        line = temp;
      }

      linesArray[lineCounter] = line;
    }

    linesArray.forEach((el, index) => {
      this.ctx.fillText(
        el,
        this.canvas.width / 2,
        this.canvas.height / 2 - (fontSize * lineCounter) / 2 + index * fontSize,
      );
    });
  }
}
