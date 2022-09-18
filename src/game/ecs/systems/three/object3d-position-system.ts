import {defineQuery, defineSystem} from 'bitecs';
import {World} from '../../../types';
import {Mesh} from '../../components/mesh';
import {Position} from '../../components/position';

export function object3dPositionSystem() {
  const entityQuery = defineQuery([Mesh, Position]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const mesh = world.meshes.get(entity);
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
