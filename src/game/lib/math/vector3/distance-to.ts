import {Vector3Component} from './typings';

/**
 * Distance between two vector3's from ECS component data.
 * @param ComponentA
 * @param entityA
 * @param ComponentB
 * @param entityB
 *
 * @example
 * const distance = distanceToComponent(Position, player, Position, enemy);
 */
export function distanceToComponent(
  ComponentA: Vector3Component,
  entityA: number,
  ComponentB: Vector3Component,
  entityB: number
) {
  return distanceToExploded(
    ComponentA.x[entityA],
    ComponentA.y[entityA],
    ComponentA.z[entityA],
    ComponentB.x[entityB],
    ComponentB.y[entityB],
    ComponentB.z[entityB]
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
