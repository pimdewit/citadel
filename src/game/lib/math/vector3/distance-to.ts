import {Vector3} from './typings';

/**
 * Distance between two vector3's.
 * @param vectorA
 * @param vectorB
 */
export function distanceTo(vectorA: Vector3, vectorB: Vector3): number {
  const dx = vectorA[0] - vectorB[0];
  const dy = vectorA[1] - vectorB[1];
  const dz = vectorA[2] - vectorB[2];

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
