import { deg, getContext } from "../utils";
import BasePattern, { IPattenOptions } from "./base";



export class Dot<T extends IPattenOptions = IPattenOptions> extends BasePattern<T> {
  drawPattern() {
    this.clearPattern();
    let { size, color, roundness, angle, hardness } = this.getRuntimeOptions();
    const center = size / 2;
    const hardRadius = (center * hardness + center) / 4;
    this.image.width = size;
    this.image.height = size;
    const ctx = getContext(this.image);
    ctx.save();
    
    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // ctx.lineTo(size, 0);
    // ctx.lineTo(size, size);
    // ctx.lineTo(0, size);
    // ctx.closePath();
    // ctx.stroke();
    if (angle % 360 !== 0) {
      ctx.translate(center, center);
      ctx.rotate(deg(angle));
      ctx.translate(-center, -center);
    }
    if (roundness !== 1) {
      const transX = (1 - roundness) * size / 2; 
      ctx.translate(transX, 0)
      ctx.scale(roundness, 1);
    }

    ctx.beginPath();
    ctx.arc(center, center, center - 1, 0, deg(360))
    ctx.closePath();
    ctx.fillStyle = color.toString();
    if (size === 1 || hardness === 1) {
      ctx.fillStyle = color.toString();
    } else  {
      const gradient = ctx.createRadialGradient(center, center, hardRadius, center, center, center);
      gradient.addColorStop(0, color.fade(0).toString());
      gradient.addColorStop(1, color.fade(1).toString());
      ctx.fillStyle = gradient;
    }
    ctx.fill();

    ctx.restore();
  }
}