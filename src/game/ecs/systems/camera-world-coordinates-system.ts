import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {Camera} from '../components/camera';
import {CameraActive} from '../components/camera-active';
import {Position} from '../components/position';
import {VisualBox} from '../components/visual-box';
import {cameras, visualMeshes} from '../shared-entities';

export function cameraWorldCoordinatesSystem() {
  const entityQuery = defineQuery([Position, VisualBox]);
  const cameraQuery = defineQuery([Camera, CameraActive]);

  return defineSystem(world => {
    const entities = entityQuery(world);
    const [cameraId] = cameraQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const mesh = visualMeshes.get(id);
      if (!mesh) continue;

      const world = mesh.uniforms.u_world;
      m4.transpose(
        m4.inverse(world, mesh.uniforms.u_worldInverseTranspose),
        mesh.uniforms.u_worldInverseTranspose
      );

      const camera = cameras.get(cameraId);
      if (!camera) continue;
      m4.multiply(
        camera.viewProjection,
        mesh.uniforms.u_world,
        mesh.uniforms.u_worldViewProjection
      );
    }

    return world;
  });
}
