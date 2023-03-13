import { IPoint } from "../types/msic";
import { distance } from "../utils";

export function lineUp(a: IPoint, b: IPoint, plot: (x: number, y: number) => void, spacing:number = 1) {
  let { x: x0, y: y0 } = a;
  let { x: x1, y: y1 } = b;
  let dx = x1 - x0;
  let dy = y1 - y0;
  const steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
  let x = x0;
  let y = y0;
  const dis = distance(a, b);
  if (dis < spacing) {
    plot(x0, y0);
    return { x, y };
  }
  // console.log('begin', x0, y0, x1, y1, dis, spacing);
  const angle = Math.atan2(dy, dx);
  let xStep = Math.abs(Math.ceil(spacing * Math.cos(angle)))
  let yStep = Math.abs(Math.ceil(spacing * Math.sin(angle)))
  xStep = xStep < 1 ? 1 : xStep;
  yStep = yStep < 1 ? 1 : yStep;
  xStep = dx > 0 ? xStep : -xStep;
  yStep = dy > 0 ? yStep : -yStep;

  if (steep) {
    [dx, dy] = [dy, dx];
    [x, y] = [y, x];
    [xStep, yStep] = [yStep, xStep];
    [x1, y1] = [y1, x1];
  }
  let absXStep = Math.abs(xStep);
  let absDy = Math.abs(dy);
  let absDx = Math.abs(dx);
  let p = -absDx / 2;
  let baseYStep = dy > 0 ? 1 : -1;
  while (x !== x1) {
    !steep ? plot(x, y) : plot(y, x);
      for (let i = 0; i < absXStep; i++) {
        p += absDy
        if (p > 0) {
          y += baseYStep;
          p -= absDx;
        }
      }
    x += xStep;
    if (dx > 0) {
      if (x >= x1) {
        break;
      }
    } else {
      if (x <= x1) {
        break;
      }
    }
  }
  // console.log('end', !steep ? [x, y] : [y, x]);
  return !steep ? { x, y } : { x: y, y: x }
}