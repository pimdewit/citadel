import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {Object3D} from 'three';
import {applyObject3dTransforms} from '../../../lib/entity-hooks/apply-object3d-transforms';
import {World} from '../../../types';
import {Group} from '../../components/group';

export function object3dSystem() {
  const entityQuery = defineQuery([Group]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];
      const object3d = new Object3D();
      applyObject3dTransforms(world, object3d, entity);

      world.groups.set(entity, object3d);

      const parent = world.groups.get(Group.parent[entity]) || world.scene;
      parent.add(object3d);
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      const object3d = world.groups.get(entity);
      if (object3d) {
        const parent = world.groups.get(Group.parent[entity]) || world.scene;
        parent.remove(object3d);
        world.groups.delete(entity);
      }
    }

    return world;
  });
}
