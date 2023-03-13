import Color from "color";
import { IPoint } from "../types/msic";
import { deg } from "../utils";
import { Dot } from "./dot";


export class ColorJitterBrush extends Dot {
  options = {
    color: Color('#F00'),
    size: 40,
    spacing: 1,
  };

  beforeDrawing(_point: IPoint): void {
      let { color } = this.options;
      this.setOptions({
        color: color.rotate(deg(10)),
      })
  }
}