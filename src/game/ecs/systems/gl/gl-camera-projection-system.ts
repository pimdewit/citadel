import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {World} from '../../../types';
import {Camera} from '../../components/camera/camera';
import {CameraActive} from '../../components/camera/camera-active';
import {CameraPerspective} from '../../components/camera/camera-perspective';
import {Position} from '../../components/position';

export function glCameraProjectionSystem() {
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

      camera.perspective = m4.perspective(
        CameraPerspective.fov[entity],
        CameraPerspective.aspect[entity],
        CameraPerspective.near[entity],
        CameraPerspective.far[entity]
      );
    }

    return world;
  });
}
