import Color from "color";
import { IPattenOptions, IPattern, IPoint } from "../types/msic";
import { createCanvas, distance, getContext, objHas } from "../utils";

export default class BasePattern<T extends IPattenOptions = IPattenOptions> implements IPattern<T>{
  image: HTMLCanvasElement = createCanvas(1, 1).cvs;
  
  options: T = {
    size: 25,
    color: Color('#000'),
    spacing: 1
  } as T;

  constructor() {
    this.drawPattern();
  }

  setOptions(options: Partial<typeof this.options> & { [k: string]: any }) {
    Object.assign(this.options, options);
    if (objHas(options, 'color') || objHas(options, 'size')) {
      this.drawPattern();
    }
  }

  protected clearPattern() {
    const { size } = this.options;
    const ctx = getContext(this.image) as CanvasRenderingContext2D;
    this.image.width = size;
    this.image.height = size;
    ctx.clearRect(0, 0, size, size);
  }

  drawPattern(): void {}

  beforeDrawing(_point: IPoint) {}

  pointFilter(a: IPoint, b: IPoint) {
    if (this.options.spacing <= 1) {
      return true;
    }
    return distance(a, b) >= this.options.spacing
  }
}