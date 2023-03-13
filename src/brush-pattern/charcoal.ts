import { IPoint } from "../types/msic";
import { WritingBrush } from "./writing-brush";


export class Charcoal extends WritingBrush {
  beforeDrawing(_point: IPoint): void {
    this.setOptions({
      size: Math.ceil(Math.random() * 50)
    })
  }
}