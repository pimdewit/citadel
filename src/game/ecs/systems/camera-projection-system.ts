import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {Camera} from '../../lib/camera';
import {Position} from '../components/position';
import {VisualBox} from '../components/visual-box';
import {visualMeshes} from '../shared-entities';

/**
 * Apply transformations to the meshes.
 * @param camera
 */
export function cameraProjectionSystem(camera: Camera) {
  const entityQuery = defineQuery([Position, VisualBox]);

  return defineSystem(world => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const mesh = visualMeshes.get(id);
      if (!mesh) continue;

      const world = mesh.uniforms.u_world;
      m4.transpose(
        m4.inverse(world, mesh.uniforms.u_worldInverseTranspose),
        mesh.uniforms.u_worldInverseTranspose
      );
      m4.multiply(
        camera.viewProjection,
        mesh.uniforms.u_world,
        mesh.uniforms.u_worldViewProjection
      );
    }

    return world;
  });
}
