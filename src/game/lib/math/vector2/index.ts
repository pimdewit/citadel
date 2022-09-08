/** [x, y] vector representation. */
import {setVector2} from './set-vector2';
import {Vector2} from './typings';

/**
 * Creates a new Vector2 instance.
 * @param [x = 0] The first coordinate.
 * @param [y = 0] The second coordinate.
 */
export function vector2(x: number = 0, y: number = 0) {
  const vector = new Float32Array(2) as Vector2;
  setVector2(vector, x, y);
  return vector;
}
