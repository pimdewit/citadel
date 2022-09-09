import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {setVector3} from '../../../lib/math/vector3/set-vector3';
import {World} from '../../../types';
import {Mesh} from '../../components/mesh';
import {Position} from '../../components/position';

export function glPositionSystem() {
  const entityQuery = defineQuery([Mesh, Position]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const mesh = world.meshes.get(id);
      if (!mesh) continue;

      m4.identity(mesh.uniforms.u_world);
      setVector3(mesh.position, Position.x[id], Position.y[id], Position.z[id]);
      m4.translate(mesh.uniforms.u_world, mesh.position, mesh.uniforms.u_world);
    }

    return world;
  });
}
