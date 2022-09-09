import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {setVector3} from '../../../lib/math/vector3/set-vector3';
import {World} from '../../../types';
import {Mesh} from '../../components/mesh';
import {Scale} from '../../components/scale';

export function glScaleSystem() {
  const entityQuery = defineQuery([Mesh, Scale]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const mesh = world.meshes.get(id);
      if (!mesh) continue;

      setVector3(mesh.scale, Scale.x[id], Scale.y[id], Scale.z[id]);
      m4.scale(mesh.uniforms.u_world, mesh.scale, mesh.uniforms.u_world);
    }

    return world;
  });
}
