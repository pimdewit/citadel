import {Vector3} from './typings';

export function setVector3(vector: Vector3, x: number, y: number, z: number) {
  vector[0] = x;
  vector[1] = y;
  vector[2] = z;

  return vector;
}
