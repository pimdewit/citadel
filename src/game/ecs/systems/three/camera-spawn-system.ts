import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {PerspectiveCamera} from 'three';
import {World} from '../../../types';
import {Camera} from '../../components/camera/camera';
import {CameraActive} from '../../components/camera/camera-active';
import {Position} from '../../components/position';

export function CameraSpawnSystem() {
  const entityQuery = defineQuery([Position, Camera, CameraActive]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);
    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];
      const camera = new PerspectiveCamera();
      world.cameras.set(entity, camera);
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      if (world.cameras.has(entity)) world.cameras.delete(entity);
    }

    return world;
  });
}
