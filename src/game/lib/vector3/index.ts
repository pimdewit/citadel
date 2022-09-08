import {setVector3} from './set-vector3';
import {Vector3} from './typings';

/**
 * Creates a new Vector2 instance.
 * @param [x = 0] The first coordinate.
 * @param [y = 0] The second coordinate.
 * @param [z = 0] The third coordinate.
 */
export function vector3(x: number = 0, y: number = 0, z: number = 0) {
  const vector = new Float32Array(3) as Vector3;
  setVector3(vector, x, y, z);
  return vector;
}
