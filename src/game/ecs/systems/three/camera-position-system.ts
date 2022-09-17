import {defineQuery, defineSystem} from 'bitecs';
import {Vector3} from 'three';
import {World} from '../../../types';
import {Camera} from '../../components/camera/camera';
import {CameraActive} from '../../components/camera/camera-active';
import {CameraPerspective} from '../../components/camera/camera-perspective';
import {CameraTarget} from '../../components/camera/camera-target';
import {Position} from '../../components/position';

export function cameraPositionSystem() {
  const entityQuery = defineQuery([
    Camera,
    CameraActive,
    CameraPerspective,
    Position,
  ]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const camera = world.cameras.get(entity);
      if (!camera) throw new Error('no camera found');

      camera.position.set(
        Position.x[entity],
        Position.y[entity],
        Position.z[entity]
      );

      const lookAt = new Vector3(
        CameraTarget.x[entity],
        CameraTarget.y[entity],
        CameraTarget.z[entity]
      );
      camera.lookAt(lookAt);
    }

    return world;
  });
}
