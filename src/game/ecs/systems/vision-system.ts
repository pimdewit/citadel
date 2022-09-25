import {
  addComponent,
  defineQuery,
  defineSystem,
  hasComponent,
  removeComponent,
} from 'bitecs';
import {distanceToComponent} from '../../lib/math/vector3/distance-to';
import {World} from '../../types';
import {Position} from '../components/position';
import {Perceivable} from '../components/tag/perceivable';
import {Revealed} from '../components/tag/revealed';
import {Vision} from '../components/vision';

export function visionSystem() {
  const entityQuery = defineQuery([Position, Vision]);
  const enemyQuery = defineQuery([Position, Perceivable]);

  return defineSystem((world: World) => {
    const allies = entityQuery(world);
    const enemies = enemyQuery(world);

    const revealedEnemies: Set<number> = new Set();

    for (let i = 0; i < allies.length; ++i) {
      const ally = allies[i];
      const radius = Vision.radius[ally];

      // Vision has no radius, continue.
      if (!radius) continue;

      let closestDistance = Infinity;
      let closestEntity: number = -1;

      for (let j = 0; j < enemies.length; j++) {
        const enemy = enemies[j];

        const distance = distanceToComponent(Position, ally, Position, enemy);
        const isWithinDistance = distance >= 0 && distance < radius;

        if (!isWithinDistance) continue;

        revealedEnemies.add(enemy);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestEntity = enemy;
        }
      }

      Vision.target[ally] = closestEntity;
    }

    // Set revealed state.
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      const isRevealed = hasComponent(world, Revealed, enemy);

      if (revealedEnemies.has(enemy)) {
        if (!isRevealed) addComponent(world, Revealed, enemy);
      } else if (isRevealed) {
        removeComponent(world, Revealed, enemy);
      }
    }

    return world;
  });
}
