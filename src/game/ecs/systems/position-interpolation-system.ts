import {defineQuery, defineSystem} from 'bitecs';
import {interpolate} from '../../lib/math/interpolate';
import {World} from '../../types';
import {Position} from '../components/position';
import {PositionInterpolationTarget} from '../components/position-interpolation-target';
import {Velocity} from '../components/velocity';

export function positionInterpolationSystem() {
  const entityQuery = defineQuery([
    Position,
    PositionInterpolationTarget,
    Velocity,
  ]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      PositionInterpolationTarget.x[entity] += Velocity.x[entity];
      PositionInterpolationTarget.y[entity] += Velocity.y[entity];
      PositionInterpolationTarget.z[entity] += Velocity.z[entity];

      Position.x[entity] = interpolate(
        PositionInterpolationTarget.x[entity],
        Position.x[entity],
        PositionInterpolationTarget.alpha[entity]
      );
      Position.y[entity] = interpolate(
        PositionInterpolationTarget.y[entity],
        Position.y[entity],
        PositionInterpolationTarget.alpha[entity]
      );
      Position.z[entity] = interpolate(
        PositionInterpolationTarget.z[entity],
        Position.z[entity],
        PositionInterpolationTarget.alpha[entity]
      );
    }

    return world;
  });
}
