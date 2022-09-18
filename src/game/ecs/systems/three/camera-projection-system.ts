import {defineQuery, defineSystem, removeComponent} from 'bitecs';
import {World} from '../../../types';
import {Camera} from '../../components/camera/camera';
import {CameraNeedsUpdate} from '../../components/camera/camera-needs-update';
import {CameraPerspective} from '../../components/camera/camera-perspective';

export function cameraProjectionSystem() {
  const entityQuery = defineQuery([
    Camera,
    CameraPerspective,
    CameraNeedsUpdate,
  ]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const camera = world.cameras.get(entity);
      if (!camera) throw new Error('no camera found');

      camera.fov = CameraPerspective.fov[entity];
      camera.aspect = CameraPerspective.aspect[entity];
      camera.near = CameraPerspective.near[entity];
      camera.far = CameraPerspective.far[entity];

      camera.updateProjectionMatrix();
      // Camera is updated, remove needsUpdate flag.
      removeComponent(world, CameraNeedsUpdate, entity);
    }

    return world;
  });
}
