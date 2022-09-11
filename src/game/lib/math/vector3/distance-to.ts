import {Vector3, Vector3Component} from './typings';

/**
 * Distance between two vector3's.
 * @param vectorA
 * @param vectorB
 */
export function distanceTo(vectorA: Vector3, vectorB: Vector3): number {
  return distanceToExploded(
    vectorA[0],
    vectorA[1],
    vectorA[2],
    vectorB[0],
    vectorB[1],
    vectorB[2]
  );
}

/**
 * Distance between two vector3's from ECS component data.
 * @param ComponentA
 * @param eidA
 * @param ComponentB
 * @param eidB
 *
 * @example
 * const distance = distanceToComponent(Position, player, Position, enemy);
 */
export function distanceToComponent(
  ComponentA: Vector3Component,
  eidA: number,
  ComponentB: Vector3Component,
  eidB: number
) {
  return distanceToExploded(
    ComponentA.x[eidA],
    ComponentA.y[eidA],
    ComponentA.z[eidA],
    ComponentB.x[eidB],
    ComponentB.y[eidB],
    ComponentB.z[eidB]
  );
}

/** Distance between two vector3's. */
export function distanceToExploded(
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const dz = z1 - z2;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
