import {defineQuery, defineSystem, Not} from 'bitecs';
import {Position} from '../components/position';
import {PositionInterpolated} from '../components/position-interpolated';
import {Velocity} from '../components/velocity';

export function positionSystem() {
  const entityQuery = defineQuery([
    Position,
    Velocity,
    Not(PositionInterpolated),
  ]);

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
