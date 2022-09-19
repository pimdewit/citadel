import {defineQuery, defineSystem, Not} from 'bitecs';
import {World} from '../../../types';
import {Mesh} from '../../components/mesh';
import {Group} from '../../components/group';
import {Scale} from '../../components/scale';
import {Static} from '../../components/tag/static';

export function object3dScaleSystem() {
  const entityQuery = defineQuery([Mesh, Scale, Not(Static)]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const mesh = world.meshes.get(entity);
      if (!mesh) continue;

      mesh.scale.set(Scale.x[entity], Scale.y[entity], Scale.z[entity]);
    }

    return world;
  });
}
