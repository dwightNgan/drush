import {  getContext } from "../utils";
import BasePattern from "./base";

export class Rect extends BasePattern {
  drawPattern() {
    this.clearPattern();
    const { size, color } = this.options;
    const ctx = getContext(this.image) as CanvasRenderingContext2D;
    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, size, size);
    // document.body.append(this.image);
  }
}