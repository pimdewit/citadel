import {
  defineQuery,
  defineSystem,
  enterQuery,
  exitQuery,
  hasComponent,
} from 'bitecs';
import {Object3D} from 'three';
import {Mesh as ThreeMesh} from 'three/src/objects/Mesh';
import {applyObject3dTransforms} from '../../../lib/entity-hooks/apply-object3d-transforms';
import {sceneGraphParent} from '../../../lib/entity-hooks/scene-graph-parent';
import {TOGGLE_BINARY, World} from '../../../types';
import {Mesh} from '../../components/mesh';
import {Object3d} from '../../components/tag/object-3d';

function createObject(world: World, entity: number) {
  if (hasComponent(world, Mesh, entity)) {
    let bufferInfo = world.resources.geometries(Mesh.geometry[entity]);

    // Whether a new instance of the geometry should be created.
    if (Mesh.newInstance[entity] === TOGGLE_BINARY.TRUE) {
      bufferInfo = bufferInfo.clone();
    }

    const programInfo = world.resources.programs(Mesh.program[entity]).clone();
    return new ThreeMesh(bufferInfo, programInfo);
  }

  return new Object3D();
}

export function object3dSystem() {
  const entityQuery = defineQuery([Object3d]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];

      const object3d = createObject(world, entity);
      applyObject3dTransforms(world, object3d, entity);

      world.sceneGraphNodes.set(entity, object3d);

      const parent = sceneGraphParent(world, entity);
      parent.add(object3d);
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      const object3d = world.sceneGraphNodes.get(entity);
      if (object3d) {
        const parent = sceneGraphParent(world, entity);
        parent.remove(object3d);
        world.sceneGraphNodes.delete(entity);
      }
    }

    return world;
  });
}
