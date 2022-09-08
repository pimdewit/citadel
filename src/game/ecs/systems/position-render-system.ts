import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {Position} from '../components/position';
import {VisualBox} from '../components/visual-box';
import {visualMeshes} from '../shared-entities';

export function positionRenderSystem() {
  const entityQuery = defineQuery([VisualBox, Position]);

  return defineSystem(world => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const mesh = visualMeshes.get(id);
      if (!mesh) continue;

      const world = mesh.uniforms.u_world;
      m4.identity(world);

      setVector3(mesh.position, Position.x[id], Position.y[id], Position.z[id]);

      m4.translate(world, mesh.position, world);
    }

    return world;
  });
}
