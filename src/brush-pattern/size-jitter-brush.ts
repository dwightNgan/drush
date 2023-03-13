import Color from "color";
import { IPoint } from "../types/msic";
import { FeatherBrush } from "./feather-brush";


export class SizeJitterBrush extends FeatherBrush {
  options = {
    color: Color('#FF0'),
    size: 40,
    spacing: 1,
  };

  beforeDrawing(_point: IPoint): void {
    this.setOptions({
      size: Math.ceil(Math.random() * 50)
    })
  }
}