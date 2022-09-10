import {defineQuery, defineSystem} from 'bitecs';
import {World} from '../../../types';
import {Camera} from '../../components/camera/camera';
import {CameraActive} from '../../components/camera/camera-active';

export function glCameraUpdateSystem() {
  const entityQuery = defineQuery([Camera, CameraActive]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const camera = world.cameras.get(id);
      if (!camera) throw new Error('no camera found');
      camera.update();
    }

    return world;
  });
}
