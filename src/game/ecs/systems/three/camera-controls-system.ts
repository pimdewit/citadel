import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {orbitControls} from '../../../lib/input/orbit-controls';
import {World} from '../../../types';
import {Camera} from '../../components/camera/camera';
import {CameraOrbitControls} from '../../components/camera/camera-orbit-controls';
import {Position} from '../../components/position';

export function cameraControlsSystem() {
  const entityQuery = defineQuery([Camera, CameraOrbitControls]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);
    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];
      const camera = world.cameras.get(entity);
      if (!camera) continue;
      camera.position.set(
        Position.x[entity],
        Position.y[entity],
        Position.z[entity]
      );
      const controls = orbitControls(camera, world.renderer.domElement, entity);
      camera.userData.controls = controls;

      const parent = world.groups.get(Camera.parent[entity]);
      if (parent) controls.target = parent.position;
    }

    const entities = entityQuery(world);
    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const camera = world.cameras.get(entity);
      if (!camera) continue;
      if (!camera.userData.controls) continue;
      camera.userData.controls.update();
      Position.x[entity] = camera.position.x;
      Position.y[entity] = camera.position.y;
      Position.z[entity] = camera.position.z;
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      const camera = world.cameras.get(entity);
      if (!camera) continue;
      camera.userData.controls.dispose();
      camera.userData.controls = null;
    }

    return world;
  });
}
