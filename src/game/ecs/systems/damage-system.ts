import {defineQuery, defineSystem, hasComponent, removeEntity} from 'bitecs';
import {distanceToComponent} from '../../lib/math/vector3/distance-to';
import {setVector3Component} from '../../lib/math/vector3/set-vector3-component';
import {World} from '../../types';
import {Attack} from '../components/attack';
import {Health} from '../components/health';
import {Position} from '../components/position';
import {Scale} from '../components/scale';
import {Vision} from '../components/vision';

function damageSystem() {
  const entityQuery = defineQuery([Position, Vision, Attack]);
  const enemyQuery = defineQuery([Position, Health]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);
    const enemies = enemyQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];

      // No vision, continue.
      if (!Vision.distance[entity]) continue;

      for (let j = 0; j < enemies.length; j++) {
        const enemy = enemies[j];

        // No health, continue.
        if (Health.current[enemy] <= 0) continue;

        const distance = distanceToComponent(Position, entity, Position, enemy);

        if (distance >= 0 && distance < Vision.distance[entity]) {
          Health.current[enemy] -= Attack.damage[entity];

          if (hasComponent(world, Scale, enemy)) {
            const health = Health.current[enemy] / Health.total[enemy];
            const scale = Math.max(0, health);
            setVector3Component(Scale, enemy, scale, scale, scale);
          }

          if (Health.current[enemy] <= 0) removeEntity(world, enemy);
        }
      }
    }

    return world;
  });
}

export {damageSystem};
