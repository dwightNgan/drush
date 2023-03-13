import { IPoint } from "../types/msic";

export class Line {
  xStep: number = 1;
  yStep: number = 1;
  times: number = 1;
  spacing: number = 1;

  lineUp(a: IPoint, b: IPoint, plot: (x: number, y: number) => void) {
    const dis = this.spacing;
    let { x: x0, y: y0 } = a;
    let { x: x1, y: y1 } = b;
    const steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
    if (steep) {
      [y0, x0] = [x0, y0];
      [y1, x1] = [x1, y1];
    }
    const leftward = x0 > x1;
    // const leftward = false;
    // if (x0 > x1) {
    //   [x1, x0] = [x0, x1];
    //   [y1, y0] = [y0, y1];
    // }
    const deltaX = x1 - x0;
    const deltaY = Math.abs(y1 - y0);
    const angle = Math.atan2(deltaY, deltaX);
    let xStep = Math.ceil(dis * Math.cos(angle));
    xStep = xStep < 1 ? 1 : xStep;
    let yStep = Math.ceil(dis * Math.sin(angle));
    console.log('ystep', yStep);
    yStep = yStep < 1 ? 1 : yStep;
    let error = deltaX / 2;
    const isDown = y0 < y1
    // const yStep = isDown ? this.yStep : -this.yStep;
    yStep = isDown ? yStep : -yStep;
    let x = x0;
    let y = y0;
    const yMax = isDown ? y1 : y0;
    console.log(x0, y0, x1, y1);
    if (leftward) {
      for (; x >= x1; x -= xStep) {
        const coords = steep ? [y, x] : [x, y];
        console.log('points', ...coords);
        plot(coords[0], coords[1]);
        console.log('points', error, deltaY, deltaX);
        error -= deltaY;
        if (error < 0) {
          y += yStep
          error -= deltaX
        }
      }
      return { x, y } 
    }
    for (; x <= x1; x += xStep) {
      const coords = steep ? [y, x] : [x, y];
      plot(coords[0], coords[1]);
      error -= deltaY;
      if (xStep === 1) {
        if (error < 0) {
          y += yStep
          error += deltaX
        }
      } else {
        for (let i = 1; i <= xStep; i++) {
          error -= deltaY;
          if (error < 0) {
            if (i === xStep) {
              y += yStep
            }
            error += deltaX
          } else {
            if (i === xStep) {
              y += yStep + (isDown ? 1 : -1)
            }
          }
        }
      }
      if (y > yMax) {
        break;
      }
    }
    return { x, y }
  }
  lineUp2(a: IPoint, b: IPoint, plot: (x: number, y: number) => void) {
    let { x: x0, y: y0 } = a;
    let { x: x1, y: y1 } = b;
    const steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
    if (steep) {
      [y0, x0] = [x0, y0];
      [y1, x1] = [x1, y1];
    }
    if (x0 > x1) {
      [x1, x0] = [x0, x1];
      [y1, y0] = [y0, y1];
    }
    const deltaX = x1 - x0;
    const deltaY = Math.abs(y1 - y0);
    let error = deltaX / 2;
    const yStep = y0 < y1 ? this.yStep : -this.yStep;
    // const xStep = isRight ? this.xStep : -this.xStep;
    let y = y0;
    for (let x = x0; x <= x1; x += this.xStep) {
      const coords = steep ? [y, x] : [x, y];
      plot(coords[0], coords[1]);
      error -= deltaY;
      if (error < 0) {
        y += yStep
        error += deltaX
      }
    }
  }
  lineUp3(a: IPoint, b: IPoint, plot: (x: number, y: number) => void) {
    let { x: x0, y: y0 } = a;
    let { x: x1, y: y1 } = b;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const m = dy / dx;
    let x = x0;
    let y = y0;
    // console.log(x0, y0, x1, y1);
    // console.log(dx, dy, m);
    if (dx === 0) {
      const step = dy > 0 ? 1 : -1
      while (y !== y1) {
        plot(x, y);
        y += step;
      }
    } else if (dy === 0) {
      const step = dx > 0 ? 1 : -1;
      while (x !== x1) {
        plot(x, y);
        x += step;
      }
    } else if (dx > 0 && dy > 0) {
      if (m <= 1) {
        let p = -dx / 2;
        while (x !== x1) {
          plot(x, y)
          p += dy
          if (p > 0) {
            y += 1
            p -= dx
          }
          x += 1;
        }
      } else {
        let p = -dy / 2;
        while (y !== y1) {
          plot(x, y)
          p += dx
          if (p > 0) {
            x += 1
            p -= dy
          }
          y += 1;
        }
      }
    } else if (dx > 0 && dy < 0) {
      if (m >= -1) {
        let p = -dx / 2;
        while (x !== x1) {
          plot(x, y)
          p -= dy
          if (p > 0) {
            y -= 1
            p += dx
          }
          x += 1;
        }
      } else {
        let p = -dy / 2;
        while (y !== y1) {
          plot(x, y)
          p += dx
          if (p > 0) {
            x += 1
            p += dy
          }
          y -= 1;
        }
      }
    } else if (dx < 0 && dy < 0) {
      if (m <= 1) {
        let p = -dx / 2;
        while (x !== x1) {
          plot(x, y)
          p -= dy
          if (p > 0) {
            y -= 1
            p += dx
          }
          x -= 1;
        }
      } else {
        let p = -dy / 2;
        while (y !== y1) {
          plot(x, y)
          p -= dx
          if (p > 0) {
            x -= 1
            p += dy
          }
          y -= 1;
        }
      }
    } else if (dx < 0 && dy > 0) {
      if (m >= -1) {
        let p = -dx / 2;
        while (x !== x1) {
          plot(x, y)
          p += dy
          if (p > 0) {
            y += 1
            p += dx
          }
          x -= 1;
        }
      } else {
        console.log('steep')
        let p = -dy / 2;
        while (y !== y1) {
          plot(x, y)
          p -= dx
          if (p > 0) {
            x -= 1
            p -= dy
          }
          y += 1;
        }
      }
    }
    console.log(x, y);
  }
}