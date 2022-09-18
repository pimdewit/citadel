import {addComponent} from 'bitecs';
import {CameraNeedsUpdate} from '../../ecs/components/camera/camera-needs-update';
import {CameraPerspective} from '../../ecs/components/camera/camera-perspective';
import {World} from '../../types';

export function resizeCamera(
  world: World,
  aspect: number,
  needsUpdate = false
) {
  for (const id of world.cameras.keys()) {
    CameraPerspective.aspect[id] = aspect;
    if (needsUpdate) addComponent(world, CameraNeedsUpdate, id);
  }
}
