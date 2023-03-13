import { IPoint } from "../types/msic";

export function createCanvas(width: number, height: number) {
  const cvs = document.createElement('canvas');
  cvs.width = width;
  cvs.height = height;
  const ctx = cvs.getContext('2d');
  return { cvs, ctx }
}

export function getContext(cvs: HTMLCanvasElement) {
  const ctx = cvs.getContext('2d')
  if (ctx) {
    return ctx;
  }
  throw Error('cannot get the context');
}

export function deg(d: number) {
  return d * Math.PI / 180;
}

export function distance(a: IPoint, b: IPoint) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function objHas(obj: any, key: string) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}

export function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    }
    img.onerror = function (e: string | Event) {
      reject(e);
    }
    img.src = src
  })
}

export function rotateImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, rotate: number) {
  const cvs = ctx.canvas;
  ctx.save();
  if (rotate < 0) {
    rotate = 360 + rotate
  }
  rotate = rotate % 360

  if (rotate > 45 && rotate < 135) { // 90 宽高颠倒
    cvs.width = img.height
    cvs.height = img.width
  } else if (rotate > 225 && rotate < 315) { // 270 宽高颠倒
    cvs.width = img.height
    cvs.height = img.width
  } else {
    cvs.width = img.width
    cvs.height = img.height
  }
  const halfWidth = cvs.width / 2;
  const halfHeight = cvs.height / 2;
  const degree = deg(rotate);
  ctx.clearRect(0, 0, cvs.width, cvs.height)
  ctx.translate(halfWidth, halfHeight)
  ctx.rotate(degree)
  ctx.translate(-halfWidth, -halfHeight)
  ctx.drawImage(img, 0, 0, img.width, img.height, halfWidth - img.width / 2, halfHeight - img.height / 2, cvs.width, cvs.height);
  ctx.translate(halfWidth, halfHeight)
  ctx.rotate(-degree)
  ctx.translate(-halfWidth, -halfHeight)

  ctx.restore()
}

export function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}