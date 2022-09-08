import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {World} from '../../types';
import {Angle} from '../components/angle';
import {VisualBox} from '../components/visual-box';

export function angleRenderSystem() {
  const entityQuery = defineQuery([VisualBox, Angle]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const mesh = world.meshes.get(id);
      if (!mesh) continue;

      const m4World = mesh.uniforms.u_world;
      m4.rotateX(m4World, Angle.x[id], m4World);
      m4.rotateY(m4World, Angle.y[id], m4World);
      m4.rotateZ(m4World, Angle.z[id], m4World);
    }

    return world;
  });
}
