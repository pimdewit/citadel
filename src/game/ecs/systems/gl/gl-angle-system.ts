import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {World} from '../../../types';
import {Angle} from '../../components/angle';
import {Mesh} from '../../components/mesh';

export function glAngleSystem() {
  const entityQuery = defineQuery([Mesh, Angle]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const mesh = world.meshes.get(entity);
      if (!mesh) continue;

      const m4World = mesh.uniforms.u_world;
      m4.rotateX(m4World, Angle.x[entity], m4World);
      m4.rotateY(m4World, Angle.y[entity], m4World);
      m4.rotateZ(m4World, Angle.z[entity], m4World);
    }

    return world;
  });
}
