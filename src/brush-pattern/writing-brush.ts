import BasePattern, { IPattenOptions } from "./base";
import writingBrushImg from '../assets/writing-brush.png';
import { getContext, loadImg } from "../utils";

export class WritingBrush<T extends IPattenOptions = IPattenOptions> extends BasePattern<T> {
  brushImg: HTMLImageElement | null = null;
  brushImgSrc: string = writingBrushImg;

  constructor() {
    super();
    loadImg(this.brushImgSrc).then(img => {
      this.brushImg = img;
      this.drawPattern();
    })
  }

  drawPattern(): void {
    if (!this.brushImg) {
      return;
    }
      this.clearPattern();
      const { size } = this.options;
      const ctx = getContext(this.image);
      ctx.drawImage(this.brushImg, 0, 0, 50, 50, 0, 0, size, size);
      // document.body.append(this.image);
  }
}