import {
  defineQuery,
  defineSystem,
  enterQuery,
  exitQuery,
  hasComponent,
} from 'bitecs';
import {Mesh as ThreeMesh} from 'three';
import {World} from '../../../types';
import {Angle} from '../../components/angle';
import {Mesh} from '../../components/mesh';
import {Position} from '../../components/position';
import {Scale} from '../../components/scale';
import {Static} from '../../components/tag/static';

export function meshSpawnSystem() {
  const entityQuery = defineQuery([Position, Mesh]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];
      const bufferInfo = world.resources.geometries(Mesh.geometry[entity]);
      const programInfo = world.resources.programs(Mesh.program[entity]);
      const mesh = new ThreeMesh(bufferInfo, programInfo);

      if (hasComponent(world, Position, entity)) {
        mesh.position.set(
          Position.x[entity],
          Position.y[entity],
          Position.z[entity]
        );
      }

      if (hasComponent(world, Angle, entity)) {
        mesh.rotation.set(Angle.x[entity], Angle.y[entity], Angle.z[entity]);
      }

      if (hasComponent(world, Scale, entity)) {
        mesh.scale.set(Scale.x[entity], Scale.y[entity], Scale.z[entity]);
      }

      const isStatic = hasComponent(world, Static, entity);
      // If the mesh has the capability to move, mark the mesh as dynamic.
      if (isStatic) {
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
      }

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
