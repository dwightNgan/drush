import { deg, getContext } from "../utils";
import { Dot } from "./dot";

export class FeatherBrush extends Dot {
  drawPattern() {
    this.clearPattern();
    const { size, color } = this.options
    const center = size / 2;
    const ctx = getContext(this.image) as CanvasRenderingContext2D;
    if (size === 1) {
      ctx.fillStyle = color.toString();
    } else {
      const gradient = ctx.createRadialGradient(center, center, 1, center, center, center);
      gradient.addColorStop(0, color.fade(0.9).toString())
      gradient.addColorStop(1, color.fade(1).toString());
      ctx.fillStyle = gradient;
    }
    ctx.arc(center, center, center, 0, deg(360))
    ctx.fill();
    // document.body.append(this.image);
  }
}