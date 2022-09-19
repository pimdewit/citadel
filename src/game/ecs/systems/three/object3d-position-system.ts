import {defineQuery, defineSystem, Not} from 'bitecs';
import {World} from '../../../types';
import {Position} from '../../components/position';
import {Object3d} from '../../components/tag/object-3d';
import {Static} from '../../components/tag/static';

export function object3dPositionSystem() {
  const entityQuery = defineQuery([Object3d, Position, Not(Static)]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const mesh = world.sceneGraphNodes.get(entity);
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
