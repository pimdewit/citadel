import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {Angle} from '../components/angle';
import {VisualBox} from '../components/visual-box';
import {visualMeshes} from '../shared-entities';

export function angleRenderSystem() {
  const entityQuery = defineQuery([VisualBox, Angle]);

  return defineSystem(world => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const mesh = visualMeshes.get(id);
      if (!mesh) continue;

      const world = mesh.uniforms.u_world;
      m4.rotateX(world, Angle.x[id], world);
      m4.rotateY(world, Angle.y[id], world);
      m4.rotateZ(world, Angle.z[id], world);
    }

    return world;
  });
}
