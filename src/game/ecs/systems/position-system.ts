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
      const entity = entities[i];
      Position.x[entity] += Velocity.x[entity];
      Position.y[entity] += Velocity.y[entity];
      Position.z[entity] += Velocity.z[entity];
    }

    return world;
  });
}
