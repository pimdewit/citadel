import {defineQuery, defineSystem} from 'bitecs';
import {distanceToComponent} from '../../lib/math/vector3/distance-to';
import {World} from '../../types';
import {Position} from '../components/position';
import {Perceivable} from '../components/tag/perceivable';
import {Vision} from '../components/vision';

export function visionSystem() {
  const entityQuery = defineQuery([Position, Vision]);
  const enemyQuery = defineQuery([Position, Perceivable]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);
    const enemies = enemyQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const radius = Vision.radius[entity];

      // Vision has no radius, continue.
      if (!radius) continue;

      let closestDistance = Infinity;
      let closestEntity: number = -1;

      for (let j = 0; j < enemies.length; j++) {
        const enemy = enemies[j];

        const distance = distanceToComponent(Position, entity, Position, enemy);
        const isWithinDistance = distance >= 0 && distance < radius;
        if (!isWithinDistance) continue;

        if (distance < closestDistance) {
          closestDistance = distance;
          closestEntity = enemy;
        }
      }

      Vision.target[entity] = closestEntity;
    }

    return world;
  });
}
