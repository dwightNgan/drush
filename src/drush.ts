import { DrawCheck } from "./decorator/draw-check";
import { IPattern, IPoint } from "./types/msic";
import { Dot } from "./brush-pattern/dot";
import { lineUp } from "./line/bresenham";

export default class Drush {
  drawing: boolean = false;
  currentLine: IPoint[] = [];
  pattern: IPattern;
  lineUp: typeof lineUp = lineUp;
  constructor (public ctx: CanvasRenderingContext2D) {
    this.drawing = false;
    this.pattern = new Dot();
  }

  setOptions(options: Partial<typeof this.pattern.options> & { [k: string]: any }) {
    this.pattern.setOptions(options);
  }

  setPattern(pattern: IPattern) {
    this.pattern = pattern;
  }

  addPoint(point: IPoint) {
    const { x, y } = point;
    const lastPoint = this.currentLine.slice(-1)[0];
    if (lastPoint && lastPoint.x === x && lastPoint.y === y) {
      return;
    }
    if (lastPoint && this.pattern.pointFilter) {
      if (!this.pattern.pointFilter(lastPoint, { x, y })) {
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
    const brush = this.pattern;
    const { spacing } = brush.options;
    const points = this.currentLine.slice(-2);
    const drawPattern = (point: IPoint) => {
      let offset = { x: 0, y: 0 }
      if (brush.beforeDrawing) {
        brush.beforeDrawing(point);
      }
      this.ctx.drawImage(this.pattern.image, point.x + offset.x, point.y + offset.y)
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

  moveTo(point: IPoint){
    this.drawing = true;
    this.addPoint(point);
  }
  @DrawCheck
  lineTo(point: IPoint){
    this.addPoint(point);
  }
  @DrawCheck
  stop(point: IPoint) {
    this.addPoint(point);
    this.drawing = false;
    this.clearLine();
  }
}