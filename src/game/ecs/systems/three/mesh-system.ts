import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {Mesh as ThreeMesh} from 'three';
import {applyObject3dTransforms} from '../../../lib/entity-hooks/apply-object3d-transforms';
import {sceneGraphParent} from '../../../lib/entity-hooks/scene-graph-parent';
import {World} from '../../../types';
import {Mesh} from '../../components/mesh';

export function meshSystem() {
  const entityQuery = defineQuery([Mesh]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];

      const bufferInfo = world.resources.geometries(Mesh.geometry[entity]);
      const programInfo = world.resources.programs(Mesh.program[entity]);
      const mesh = new ThreeMesh(bufferInfo, programInfo);

      applyObject3dTransforms(world, mesh, entity);

      world.sceneGraphNodes.set(entity, mesh);

      const parent = sceneGraphParent(world, entity);
      parent.add(mesh);
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      const mesh = world.sceneGraphNodes.get(entity);
      if (mesh) {
        const parent = sceneGraphParent(world, entity);
        parent.remove(mesh);
        world.sceneGraphNodes.delete(entity);
      }
    }

    return world;
  });
}
