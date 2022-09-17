import {defineQuery, defineSystem} from 'bitecs';
import {World} from '../../../types';
import {Angle} from '../../components/angle';
import {Mesh} from '../../components/mesh';

export function meshAngleSystem() {
  const entityQuery = defineQuery([Mesh, Angle]);

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
