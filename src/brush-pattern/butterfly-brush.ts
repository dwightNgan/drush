import BasePattern from "./base";
import { getContext, loadImg, random } from "../utils";
import { IPoint } from "../types/msic";
import orangeButterflyImg from '../assets/orange-butterfly.png';
import purpleButterflyImg from '../assets/purple-butterfly.png';


export class ButterflyBrush extends BasePattern {
  brushImg: HTMLImageElement[] = [];
  brushImgSrcIndex: number = 0;

  constructor() {
    super();
    Promise.all([
      loadImg(orangeButterflyImg),
      loadImg(purpleButterflyImg)
    ]).then(imgs => {
      this.brushImg = imgs;
      this.drawPattern()
    })
  }

  drawPattern(): void {
    if (!this.brushImg) {
      return;
    }
      this.clearPattern();
      const { size } = this.options;
      const ctx = getContext(this.image);
      const index = random(0, 10) % 2;
      ctx.drawImage(this.brushImg[index], 0, 0, size, size);
      // document.body.append(this.image);
  }
  beforeDrawing(_point: IPoint): void {
    const spacing = random(10, 100);
    this.setOptions({
      size: spacing,
    })
  }
}