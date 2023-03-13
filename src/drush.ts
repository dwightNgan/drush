import { DrawCheck } from "./decorator/draw-check";
import { IPattern, IPoint } from "./types/msic";
import { Dot } from "./brush-pattern/dot";
import { lineUp } from "./line/bresenham";

export default class Drush {
  drawing: boolean = false;
  currentLine: IPoint[] = [];
  brushPattern: IPattern;
  lineUp: typeof lineUp = lineUp;
  constructor (public ctx: CanvasRenderingContext2D) {
    this.drawing = false;
    this.brushPattern = new Dot();
  }

  setBrushOptions(options: Partial<typeof this.brushPattern.options> & { [k: string]: any }) {
    this.brushPattern.setOptions(options);
  }

  setBrushPattern(pattern: IPattern) {
    this.brushPattern = pattern;
  }

  addPoint(point: IPoint) {
    const { x, y } = point;
    const lastPoint = this.currentLine.slice(-1)[0];
    if (lastPoint && lastPoint.x === x && lastPoint.y === y) {
      return;
    }
    if (lastPoint && this.brushPattern.pointFilter) {
      if (!this.brushPattern.pointFilter(lastPoint, { x, y })) {
        return;
      }
    }
    this.currentLine.push({ x, y })
    this.draw();
  }

  clearLine() {
    this.currentLine = [];
  }
  @DrawCheck
  draw() {
    const brush = this.brushPattern;
    const { spacing } = brush.options;
    const points = this.currentLine.slice(-2);
    const drawPattern = (point: IPoint) => {
      let offset = { x: 0, y: 0 }
      if (brush.beforeDrawing) {
        brush.beforeDrawing(point);
      }
      this.ctx.drawImage(this.brushPattern.image, point.x + offset.x, point.y + offset.y)
    }
    if (points.length === 1) {
      drawPattern(points[0])
      return;
    }
    const endPoint = this.lineUp(points[0], points[1], (x, y) => {
      drawPattern({ x, y })
    }, spacing)
    this.currentLine.splice(-1, 1, endPoint);
  }

  mousedown(point: IPoint){
    this.drawing = true;
    this.addPoint(point);
  }
  @DrawCheck
  mousemove(point: IPoint){
    this.addPoint(point);
  }
  @DrawCheck
  mouseup(point: IPoint) {
    this.addPoint(point);
    this.drawing = false;
    this.clearLine();
  }
}