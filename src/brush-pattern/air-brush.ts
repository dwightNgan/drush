import Color from 'color';
import { IPattenOptions, IPoint } from '../types/msic';
import { getContext, rotateImage } from "../utils";
import { WritingBrush } from "./writing-brush";
import airBrushImg from '../assets/air-brush.png';

interface IAirBrushOptions extends IPattenOptions {
  rotate: number
}

export class AirBrush extends WritingBrush<IAirBrushOptions> {
  options: IAirBrushOptions = {
    color: Color('#000'),
    spacing: 40,
    size: 40,
    rotate: 0
  };
  brushImgSrc: string = airBrushImg;

  drawPattern(): void {
    if (!this.brushImg) {
      return;
    }
    this.clearPattern();
    const { size } = this.options;
    this.brushImg.width = size;
    this.brushImg.height = size;
    const ctx = getContext(this.image);
    rotateImage(ctx, this.brushImg, this.options.rotate);
    // // document.body.append(this.image);
  }
  beforeDrawing(point: IPoint) {
    this.setOptions({
      rotate: Math.round(Math.random() * 360)
    })
    this.drawPattern();
    return point;
  }
}