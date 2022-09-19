import {defineQuery, defineSystem, Not} from 'bitecs';
import {World} from '../../../types';
import {Scale} from '../../components/scale';
import {Object3d} from '../../components/tag/object-3d';
import {Static} from '../../components/tag/static';

export function object3dScaleSystem() {
  const entityQuery = defineQuery([Object3d, Scale, Not(Static)]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const mesh = world.sceneGraphNodes.get(entity);
      if (!mesh) continue;

      mesh.scale.set(Scale.x[entity], Scale.y[entity], Scale.z[entity]);
    }

    return world;
  });
}
