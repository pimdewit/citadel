import {defineQuery, defineSystem, Not} from 'bitecs';
import {World} from '../../types';
import {Position} from '../components/position';
import {PositionInterpolationTarget} from '../components/position-interpolation-target';
import {Velocity} from '../components/velocity';

export function positionSystem() {
  const entityQuery = defineQuery([
    Position,
    Velocity,
    Not(PositionInterpolationTarget),
  ]);

  return defineSystem((world: World) => {
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
