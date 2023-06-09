import type Drush from "../drush";

export function DrawCheck(_target: any, _key: string, descriptor: any) {
  const originMethod = descriptor.value;
  descriptor.value = function (...params: any[]) {
    const instance = this as Drush;
    if (!instance.drawing || !instance.currentLine.length) {
      return;
    }
    originMethod.call(instance, ...params)
  }
}