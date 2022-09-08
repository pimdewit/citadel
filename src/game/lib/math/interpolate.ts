import {mix} from './mix';

export function interpolate(target: number, value: number, alpha: number) {
  return mix(value, target, alpha);
}
