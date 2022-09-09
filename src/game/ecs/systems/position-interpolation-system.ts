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
      const id = entities[i];
      PositionInterpolationTarget.x[id] += Velocity.x[id];
      PositionInterpolationTarget.y[id] += Velocity.y[id];
      PositionInterpolationTarget.z[id] += Velocity.z[id];

      Position.x[id] = interpolate(
        PositionInterpolationTarget.x[id],
        Position.x[id],
        PositionInterpolationTarget.alpha[id]
      );
      Position.y[id] = interpolate(
        PositionInterpolationTarget.y[id],
        Position.y[id],
        PositionInterpolationTarget.alpha[id]
      );
      Position.z[id] = interpolate(
        PositionInterpolationTarget.z[id],
        Position.z[id],
        PositionInterpolationTarget.alpha[id]
      );
    }

    return world;
  });
}
