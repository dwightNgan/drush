import Color from "color";
import { IPoint } from "../types/msic";
import { createCanvas, getContext, objHas } from "../utils";

export interface IPattern<T extends IPattenOptions = IPattenOptions> {
  image: HTMLCanvasElement;
  options: T;
  setOptions(options: Partial<T> & { [k: string]: any }): void;
  drawPattern(): void;
  pointFilter?(a: IPoint, b: IPoint): boolean;
  beforeDrawing?(point: IPoint): void;
}


export interface IPattenOptions {
  color: Color;
  size: number;
  spacing: number;
}

export default class BasePattern<T extends IPattenOptions = IPattenOptions> implements IPattern<T>{
  image: HTMLCanvasElement = createCanvas(1, 1).cvs;
  
  options: T = {
    size: 25,
    color: Color('#000').alpha(0.1),
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
}