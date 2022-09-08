import {defineQuery, defineSystem} from 'bitecs';
import {Transform} from '../components/transform';
import {TransformVelocity} from '../components/transform-velocity';

export function transformSystem() {
  const entityQuery = defineQuery([Transform, TransformVelocity]);

  return defineSystem(world => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      Transform.positionX[id] += TransformVelocity.positionX[id];
      Transform.positionY[id] += TransformVelocity.positionY[id];
      Transform.positionZ[id] += TransformVelocity.positionZ[id];
      Transform.rotationX[id] += TransformVelocity.rotationX[id];
      Transform.rotationY[id] += TransformVelocity.rotationY[id];
      Transform.rotationZ[id] += TransformVelocity.rotationZ[id];
      Transform.scaleX[id] += TransformVelocity.scaleX[id];
      Transform.scaleY[id] += TransformVelocity.scaleY[id];
      Transform.scaleZ[id] += TransformVelocity.scaleZ[id];
    }

    return world;
  });
}
