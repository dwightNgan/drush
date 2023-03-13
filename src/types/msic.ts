import Color from 'color';
export interface IPoint {
  x: number;
  y: number;
}

export interface IPattern<T extends IPattenOptions = IPattenOptions> {
  image: HTMLCanvasElement;
  options: T;
  setOptions(options: Partial<T> & { [k: string]: any }): void;
  drawPattern(): void;
  pointFilter(a: IPoint, b: IPoint): boolean;
  beforeDrawing?(point: IPoint): void;
}

export interface IPattenOptions {
  color: Color;
  size: number;
  spacing: number;
}