import { deg, getContext } from "../utils";
import BasePattern, { IPattenOptions } from "./base";



export class Dot<T extends IPattenOptions = IPattenOptions> extends BasePattern<T> {
  drawPattern() {
    this.clearPattern();
    const { size, color, roundness } = this.getRuntimeOptions();
    const center = size / 2;
    const ctx = getContext(this.image);
    ctx.save();
    ctx.fillStyle = color.toString();
    if (roundness !== 1) {
      const transX = (1 - roundness) * size / 2; 
      ctx.translate(transX, 0)
      ctx.scale(roundness, 1);
    }
    ctx.beginPath();
    ctx.arc(center, center, center, 0, deg(360))
    ctx.fill();
    ctx.restore();
  }
}