import {Vector2} from './typings';

export function setVector2(arr: Vector2, x: number, y: number) {
  arr[0] = x;
  arr[1] = y;

  return arr;
}
