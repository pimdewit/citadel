import {defineQuery, defineSystem, enterQuery, exitQuery, IWorld} from 'bitecs';
import {Camera as CameraGl} from '../../lib/camera';
import {Camera} from '../components/camera';
import {CameraActive} from '../components/camera-active';
import {Position} from '../components/position';
import {cameras} from '../shared-entities';

export function glCameraSystem() {
  const entityQuery = defineQuery([Position, Camera, CameraActive]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: IWorld) => {
    const entitiesEntered = entityQueryEnter(world);
    for (let i = 0; i < entitiesEntered.length; ++i) {
      const id = entitiesEntered[i];
      const camera = new CameraGl();
      cameras.set(id, camera);
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const id = entitiesExited[i];
      if (cameras.has(id)) cameras.delete(id);
    }

    return world;
  });
}
