import {defineQuery, defineSystem, hasComponent, removeEntity} from 'bitecs';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {World} from '../../types';
import {Attack} from '../components/attack';
import {Health} from '../components/health';
import {Scale} from '../components/scale';
import {Vision} from '../components/vision';

function damageSystem() {
  const entityQuery = defineQuery([Attack, Vision]);
  const enemyQuery = defineQuery([Health]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);
    const enemies = enemyQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];

      // The entity does not have a target; continue.
      if (Vision.target[entity] < 0) continue;

      for (let j = 0; j < enemies.length; j++) {
        const enemy = enemies[j];

        // The entity does not have a target; continue.
        if (Vision.target[entity] !== enemy) continue;

        // No health; continue.
        if (Health.current[enemy] <= 0) continue;

        Health.current[enemy] -= Attack.damage[entity];

        if (hasComponent(world, Scale, enemy)) {
          const health = Health.current[enemy] / Health.total[enemy];
          const scale = Math.max(0, health);
          setVector3(Scale, enemy, scale, scale, scale);
        }

        if (Health.current[enemy] <= 0) {
          removeEntity(world, enemy);
        }
      }
    }

    return world;
  });
}

export {damageSystem};
