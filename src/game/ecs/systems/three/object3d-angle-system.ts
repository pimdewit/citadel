import {defineQuery, defineSystem, Not} from 'bitecs';
import {World} from '../../../types';
import {Angle} from '../../components/angle';
import {Object3d} from '../../components/tag/object-3d';
import {Static} from '../../components/tag/static';

export function object3dAngleSystem() {
  const entityQuery = defineQuery([Object3d, Angle, Not(Static)]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const mesh = world.sceneGraphNodes.get(entity);
      if (!mesh) continue;

      mesh.rotation.set(Angle.x[entity], Angle.y[entity], Angle.z[entity]);
    }

    return world;
  });
}
