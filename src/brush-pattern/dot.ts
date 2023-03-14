import { deg, getContext } from "../utils";
import BasePattern, { IPattenOptions } from "./base";



export class Dot<T extends IPattenOptions = IPattenOptions> extends BasePattern<T> {
  drawPattern() {
    this.clearPattern();
    const { size, color } = this.options;
    const center = size / 2;
    const ctx = getContext(this.image) as CanvasRenderingContext2D;
    ctx.fillStyle = color.toString();
    ctx.arc(center, center, center, 0, deg(360))
    ctx.fill();
    // document.body.append(this.image);
  }
}