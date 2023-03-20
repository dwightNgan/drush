import Color from "color";
import { IPoint } from "../types/msic";
import { createCanvas, getContext, objHas } from "../utils";

export interface IPattern<T extends IPattenOptions = IPattenOptions> {
  image: HTMLCanvasElement;
  options: T;
  setOptions(options: Partial<T> & { [k: string]: any }): void;
  setJitter(jitter: T['jitter']): void;
  drawPattern(): void;
  getImage(): HTMLCanvasElement;
  pointFilter?(a: IPoint, b: IPoint): boolean;
  beforeDrawing?(point: IPoint): void;
}


export interface IPattenOptions {
  color: Color;
  size: number;
  spacing: number;
  jitter: {
    size: number;
  }
}

export default class BasePattern<T extends IPattenOptions = IPattenOptions> implements IPattern<T>{
  
  image: HTMLCanvasElement = createCanvas(25, 25).cvs;

  get hasJitter() {
    const { jitter } = this.options;
    return !jitter || !!Object.keys(jitter).length
  }

  
  options: T = {
    size: 25,
    color: Color('#000'),
    spacing: 1,
    jitter: {}
  } as T;

  constructor() {
    this.drawPattern();
  }


  setOptions(options: Partial<typeof this.options>) {
    Object.assign(this.options, options);
    if (objHas(options, 'color') || objHas(options, 'size')) {
      this.drawPattern();
    }
  }

  setJitter(jitter: typeof this.options['jitter']) {
    Object.assign(this.options.jitter, jitter);
  }

  getOptions(){
    return this.options;
  }

  getRuntimeOptions(): T {
    if (!this.hasJitter) {
      return Object.assign({}, this.getOptions());
    }
    const { jitter, size: staticSzie } = this.options;
    const { size } = jitter;
    const option: Partial<IPattenOptions> = {};
    if (size > 0) {
      const range = Math.round(2 * size * staticSzie);
      const min = Math.round((1 - size) * staticSzie);
      option.size = Math.random() * range + min;
    }
    return Object.assign({}, this.getOptions(), option);
  }

  getImage() {
    if (this.hasJitter) {
      this.drawPattern();
    }
    return this.image;
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