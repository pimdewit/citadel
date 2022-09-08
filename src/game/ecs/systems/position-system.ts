import {defineQuery, defineSystem} from 'bitecs';
import {Position} from '../components/position';
import {Velocity} from '../components/velocity';

export function positionSystem() {
  const entityQuery = defineQuery([Position, Velocity]);

  return defineSystem(world => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      Position.x[id] += Velocity.x[id];
      Position.y[id] += Velocity.y[id];
      Position.z[id] += Velocity.z[id];
    }

    return world;
  });
}
