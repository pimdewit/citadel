import {defineQuery, defineSystem, Not} from 'bitecs';
import {World} from '../../../types';
import {Angle} from '../../components/angle';
import {Group} from '../../components/group';
import {Static} from '../../components/tag/static';

export function object3dAngleSystem() {
  const entityQuery = defineQuery([Group, Angle, Not(Static)]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const mesh = world.meshes.get(entity);
      if (!mesh) continue;

      mesh.rotation.set(Angle.x[entity], Angle.y[entity], Angle.z[entity]);
    }

    return world;
  });
}
