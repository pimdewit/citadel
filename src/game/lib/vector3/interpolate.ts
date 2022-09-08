import {interpolate as lerp} from '../math/interpolate';
import {Vector3} from './typings';

/**
 * Interpolate a Vector3 to a target.
 * @param target The target vector3 to interpolate to.
 * @param storage The vector3 to interpolate.
 * @param [multiplier = 0.1] The multiplier it takes to catch up.
 */
export function interpolate(
  target: Vector3,
  storage: Vector3,
  multiplier: number = 0.1
): Vector3 {
  for (let index = 0; index < target.length; index++) {
    storage[index] = lerp(target[index], storage[index], multiplier);
  }

  return storage;
}
