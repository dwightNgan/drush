import { deg, getContext } from "../utils";
import BasePattern, { IPattenOptions } from "./base";



export class Dot<T extends IPattenOptions = IPattenOptions> extends BasePattern<T> {
  drawPattern() {
    this.clearPattern();
    const { size, color } = this.getRuntimeOptions();
    const center = size / 2;
    this.image.width = size;
    this.image.height = size;
    const ctx = getContext(this.image);
    ctx.fillStyle = color.toString();
    ctx.arc(center, center, center, 0, deg(360))
    ctx.fill();
  }
}