import { Dot } from './src/brush-pattern/dot';
import Drush from './src/drush';
import { IPoint } from './src/types/msic';
import { Rect } from './src/brush-pattern/rect'
import { FeatherBrush } from './src/brush-pattern/feather-brush'
import { ColorJitterBrush } from './src/brush-pattern/color-jitter-brush'
import { SizeJitterBrush } from './src/brush-pattern/size-jitter-brush'
import { Charcoal } from './src/brush-pattern/charcoal'
import { WritingBrush } from './src/brush-pattern/writing-brush'
import { ButterflyBrush } from './src/brush-pattern/butterfly-brush'
import { ScatterPlot } from './src/brush-pattern/scatter-plot'

const cvs = document.querySelector('canvas') as HTMLCanvasElement;
const ctx = cvs.getContext('2d') as CanvasRenderingContext2D;
const size = document.querySelector('#size') as HTMLInputElement;
const spacing = document.querySelector('#spacing') as HTMLInputElement;
const brushes = document.querySelectorAll<HTMLButtonElement>('.brush');
const clearBtn = document.querySelector<HTMLButtonElement>('#clear');
clearBtn?.addEventListener('click', () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
})
const brushset = {
  rect: new Rect(),
  dot: new Dot(),
  featherBrush: new FeatherBrush(),
  ranbowBrush: new ColorJitterBrush(),
  chalk: new SizeJitterBrush(),
  writingBrush: new WritingBrush(),
  charcoal: new Charcoal(),
  butterfly: new ButterflyBrush(),
}

const drush = new Drush(ctx);
const cvsOffsetLeft = cvs.offsetLeft;
const cvsOffsetTop = cvs.offsetTop;

function cursorToCvsCoord (e: MouseEvent): IPoint {
  return {
    x: e.pageX - cvsOffsetLeft,
    y: e.pageY - cvsOffsetTop,
  }
}

function mousedown(e: MouseEvent) {
  drush.moveTo(cursorToCvsCoord(e));
}

function mousemove(e: MouseEvent) {
  drush.lineTo(cursorToCvsCoord(e));
}

function mouseup(e: MouseEvent) {
  drush.stop(cursorToCvsCoord(e));
}
drush.setOptions({
  size: +size.value,
  spacing: +spacing.value
});
function changeSize(e: Event) {
  const { value } = e.target as HTMLInputElement;
  drush.setOptions({
    size: +value
  });
}
function changeGap(e: Event) {
  const { value } = e.target as HTMLInputElement;
  drush.setOptions({
    spacing: +value
  });
}

function changeBrush(e: MouseEvent) {
  const brushName = (e.target as HTMLElement).id;
  drush.setPattern(brushset[brushName]);
  drush.setOptions({
    size: +size.value,
    spacing: +spacing.value,
  })
}

cvs.addEventListener('mousedown', mousedown)
cvs.addEventListener('mousemove', mousemove)
cvs.addEventListener('mouseup', mouseup)
size.addEventListener('input', changeSize)
spacing.addEventListener('input', changeGap)
brushes.forEach((button) => {
  button.addEventListener('click', changeBrush);
})

function mock(a: IPoint, b: IPoint) {
  drush.setPattern(new ScatterPlot())
  drush.setOptions({
    spacing: 50,
    size: 10
  })
  drush.moveTo(a);
  drush.stop(b);
}

// // 第一象限，不陡
// mock({x: 200, y: 200}, {x: 300, y: 250});
// // 第一象限，陡
// mock({x: 200, y: 200}, {x: 300, y: 750});
// // 第三象限，陡
// mock({x: 200, y: 200}, {x: 150, y: 0});
// // 第三象限，不陡
// mock({x: 200, y: 200}, {x: 0, y: 100});
// // 第四象限，不陡
// mock({x: 200, y: 200}, {x: 300, y: 150});
// // 第四象限，陡
// mock({x: 200, y: 200}, {x: 250, y: 0});
// // 第二象限，不陡
// mock({x: 200, y: 200}, {x: 0, y: 300});
// // 第二象限，陡
// mock({x: 200, y: 200}, {x: 0, y: 750});
// // 垂直，y递增
// mock({x: 200, y: 200}, {x: 200, y: 450});
// // 垂直，y递减
// mock({x: 200, y: 200}, {x: 200, y: 0});
// // 水平，x递增
// mock({x: 200, y: 200}, {x: 600, y: 200});
// // 水平，x递减
// mock({x: 200, y: 200}, {x: 0, y: 200});
