import { deg, getContext, random } from "../utils";
import BasePattern from "./base";

export class ScatterPlot extends BasePattern {
  drawPattern() {
    this.clearPattern();
    const ctx = getContext(this.image) as CanvasRenderingContext2D;
    const { size, color } = this.options;
    ctx.fillStyle = color.toString();
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(random(0, 50), random(0, 50), 1, 0, deg(360))
      ctx.fill();
      ctx.closePath()
    }

  }
}