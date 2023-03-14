import { IPoint } from "../types/msic";
import { distance } from "../utils";

export interface ILineUpOptions {
  spacing: number;
  endPointValidate?: (startPoint: IPoint, endPoint: IPoint) => boolean;
}

function validateDistance(a: IPoint, b: IPoint, spacing: number) {
  return distance(a, b) < spacing;
}

export function lineUp(a: IPoint, b: IPoint, plot: (x: number, y: number) => void, options: ILineUpOptions = { spacing: 1 }) {
  const { spacing, endPointValidate = validateDistance } = options;
  let { x: x0, y: y0 } = a;
  let { x: x1, y: y1 } = b;
  let dx = x1 - x0;
  let dy = y1 - y0;
  const steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
  let x = x0;
  let y = y0;
  if (endPointValidate(a, b, spacing)) {
    return [];
  }
  const angle = Math.atan2(dy, dx);
  let xStep = Math.abs(Math.ceil(spacing * Math.cos(angle)))
  let yStep = Math.abs(Math.ceil(spacing * Math.sin(angle)))
  xStep = xStep < 1 ? 1 : xStep;
  yStep = yStep < 1 ? 1 : yStep;
  xStep = dx > 0 ? xStep : -xStep;
  yStep = dy > 0 ? yStep : -yStep;
  const points = [];
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
    if (!steep) {
      plot(x, y)
      points.push({x, y});
    } else {
      plot(y, x);
      points.push({x: y, y: x});
    }
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
  return points
}