import {defineQuery, defineSystem} from 'bitecs';
import {interpolate} from '../../lib/math/interpolate';
import {World} from '../../types';
import {Position} from '../components/position';
import {PositionInterpolated} from '../components/position-interpolated';
import {Velocity} from '../components/velocity';

export function positionInterpolationSystem() {
  const entityQuery = defineQuery([Position, PositionInterpolated, Velocity]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      PositionInterpolated.x[id] += Velocity.x[id];
      PositionInterpolated.y[id] += Velocity.y[id];
      PositionInterpolated.z[id] += Velocity.z[id];

      Position.x[id] = interpolate(
        PositionInterpolated.x[id],
        Position.x[id],
        PositionInterpolated.alpha[id]
      );
      Position.y[id] = interpolate(
        PositionInterpolated.y[id],
        Position.y[id],
        PositionInterpolated.alpha[id]
      );
      Position.z[id] = interpolate(
        PositionInterpolated.z[id],
        Position.z[id],
        PositionInterpolated.alpha[id]
      );
    }

    return world;
  });
}
