import {defineQuery, defineSystem} from 'bitecs';
import {World} from '../../../types';
import {Camera} from '../../components/camera/camera';
import {CameraActive} from '../../components/camera/camera-active';

export function renderSystem() {
  const cameraQuery = defineQuery([Camera, CameraActive]);

  return defineSystem((world: World) => {
    // We assume there is only one active camera.
    const [cameraIdentifier] = cameraQuery(world);

    const camera = world.cameras.get(cameraIdentifier);
    if (!camera) throw new Error('no camera found');

    world.renderer.render(world.scene, camera);

    return world;
  });
}
