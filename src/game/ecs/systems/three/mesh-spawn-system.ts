import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {Mesh as ThreeMesh} from 'three';
import {geometry} from '../../../_resources/geometry';
import {program} from '../../../_resources/programs';
import {World} from '../../../types';
import {Mesh} from '../../components/mesh';
import {Position} from '../../components/position';

export function meshSpawnSystem() {
  const entityQuery = defineQuery([Position, Mesh]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];

      const bufferInfo = geometry(Mesh.bufferInfo[entity]);
      const programInfo = program(Mesh.program[entity]);
      const mesh = new ThreeMesh(bufferInfo, programInfo);
      world.scene.add(mesh);
      world.meshes.set(entity, mesh);
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      const mesh = world.meshes.get(entity);
      if (mesh) {
        world.scene.remove(mesh);
        world.meshes.delete(entity);
      }
    }

    return world;
  });
}
