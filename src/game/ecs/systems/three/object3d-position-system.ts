import {defineQuery, defineSystem, Not} from 'bitecs';
import {World} from '../../../types';
import {Mesh} from '../../components/mesh';
import {Group} from '../../components/group';
import {Position} from '../../components/position';
import {Static} from '../../components/tag/static';

export function object3dPositionSystem() {
  const meshQuery = defineQuery([Mesh, Position, Not(Static)]);
  const object3dQuery = defineQuery([Group, Position, Not(Static)]);

  return defineSystem((world: World) => {
    const meshes = meshQuery(world);

    for (let i = 0; i < meshes.length; ++i) {
      const entity = meshes[i];
      const mesh = world.meshes.get(entity);
      if (!mesh) continue;

      mesh.position.set(
        Position.x[entity],
        Position.y[entity],
        Position.z[entity]
      );
    }

    const groups = object3dQuery(world);

    for (let i = 0; i < groups.length; ++i) {
      const entity = groups[i];
      const mesh = world.groups.get(entity);
      if (!mesh) continue;

      mesh.position.set(
        Position.x[entity],
        Position.y[entity],
        Position.z[entity]
      );
    }

    return world;
  });
}
