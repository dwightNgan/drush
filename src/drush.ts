import { DrawCheck } from "./decorator/draw-check";
import {IPoint } from "./types/msic";
import { Dot } from "./brush-pattern/dot";
import { LineAlgo } from "./line";
import { IPattern } from "./brush-pattern/base";

export default class Drush {
  drawing: boolean = false;
  currentLine: IPoint[] = [];
  pattern: IPattern;
  lineAlgo: LineAlgo = new LineAlgo();
  constructor (public ctx: CanvasRenderingContext2D) {
    this.drawing = false;
    this.pattern = new Dot();
    this.lineAlgo.setSpacing(this.pattern.options.spacing);
  }

  setOptions(options: Partial<typeof this.pattern.options> & { [k: string]: any }) {
    this.pattern.setOptions(options);
    this.lineAlgo.setSpacing(this.pattern.options.spacing);
    this.lineAlgo.setEndPointValidate(this.pattern.pointFilter)
  }

  setJitter(jitter: typeof this.pattern.options.jitter) {
    this.pattern.setJitter(jitter);
  }

  setPattern(pattern: IPattern) {
    this.pattern = pattern;
    this.lineAlgo.setSpacing(this.pattern.options.spacing);
    this.lineAlgo.setEndPointValidate(this.pattern.pointFilter)
  }

  addPoint(point: IPoint) {
    const {x, y} = point;
    const start = this.currentLine[this.currentLine.length - 1];
    if (start && start.x === x && start.y === y) {
      return;
    }
    if (start) {
      const newPoints = this.lineAlgo.lineUp(start, point, (x, y) => {
        this.draw({ x, y })
      })
      this.currentLine.push(...newPoints);
    }
  }

  clearLine() {
    this.currentLine = [];
  }

  draw(point: IPoint) {
    const brush = this.pattern;
    if (brush.beforeDrawing) {
      brush.beforeDrawing(point);
    }
    const image = this.pattern.getImage();
    let offset = { x: image.width / 2, y: image.height / 2 };

    this.ctx.drawImage(image, point.x - offset.x, point.y - offset.y)
  }

  moveTo(point: IPoint){
    this.drawing = true;
    this.currentLine.push(point);
    this.draw(point);
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