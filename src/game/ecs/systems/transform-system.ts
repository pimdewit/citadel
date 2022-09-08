import {defineQuery, defineSystem, hasComponent} from 'bitecs';
import {interpolate} from '../../lib/math/interpolate';
import {Transform} from '../components/transform';
import {TransformInterpolated} from '../components/transform-interpolated';
import {TransformVelocity} from '../components/transform-velocity';

/** Apply transform velocities to the transform. */
export function transformSystem() {
  const entityQuery = defineQuery([Transform, TransformVelocity]);

  return defineSystem(world => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      if (!hasComponent(world, TransformInterpolated, id)) {
        Transform.positionX[id] += TransformVelocity.positionX[id];
        Transform.positionY[id] += TransformVelocity.positionY[id];
        Transform.positionZ[id] += TransformVelocity.positionZ[id];
        Transform.rotationX[id] += TransformVelocity.rotationX[id];
        Transform.rotationY[id] += TransformVelocity.rotationY[id];
        Transform.rotationZ[id] += TransformVelocity.rotationZ[id];
        Transform.scaleX[id] += TransformVelocity.scaleX[id];
        Transform.scaleY[id] += TransformVelocity.scaleY[id];
        Transform.scaleZ[id] += TransformVelocity.scaleZ[id];
      } else {
        TransformInterpolated.positionX[id] += TransformVelocity.positionX[id];
        TransformInterpolated.positionY[id] += TransformVelocity.positionY[id];
        TransformInterpolated.positionZ[id] += TransformVelocity.positionZ[id];
        TransformInterpolated.rotationX[id] += TransformVelocity.rotationX[id];
        TransformInterpolated.rotationY[id] += TransformVelocity.rotationY[id];
        TransformInterpolated.rotationZ[id] += TransformVelocity.rotationZ[id];
        TransformInterpolated.scaleX[id] += TransformVelocity.scaleX[id];
        TransformInterpolated.scaleY[id] += TransformVelocity.scaleY[id];
        TransformInterpolated.scaleZ[id] += TransformVelocity.scaleZ[id];

        Transform.positionX[id] = interpolate(
          TransformInterpolated.positionX[id],
          Transform.positionX[id],
          TransformInterpolated.alpha[id]
        );
        Transform.positionY[id] = interpolate(
          TransformInterpolated.positionY[id],
          Transform.positionY[id],
          TransformInterpolated.alpha[id]
        );
        Transform.positionZ[id] = interpolate(
          TransformInterpolated.positionZ[id],
          Transform.positionZ[id],
          TransformInterpolated.alpha[id]
        );
        Transform.rotationX[id] = interpolate(
          TransformInterpolated.rotationX[id],
          Transform.rotationX[id],
          TransformInterpolated.alpha[id]
        );
        Transform.rotationY[id] = interpolate(
          TransformInterpolated.rotationY[id],
          Transform.rotationY[id],
          TransformInterpolated.alpha[id]
        );
        Transform.rotationZ[id] = interpolate(
          TransformInterpolated.rotationZ[id],
          Transform.rotationZ[id],
          TransformInterpolated.alpha[id]
        );
        // Transform.scaleX[id] = interpolate(TransformInterpolated.scaleX[id], Transform.scaleX[id], TransformInterpolated.alpha[id]);
        // Transform.scaleY[id] = interpolate(TransformInterpolated.scaleY[id], Transform.scaleY[id], TransformInterpolated.alpha[id]);
        // Transform.scaleZ[id] = interpolate(TransformInterpolated.scaleZ[id], Transform.scaleZ[id], TransformInterpolated.alpha[id]);
      }
    }

    return world;
  });
}
