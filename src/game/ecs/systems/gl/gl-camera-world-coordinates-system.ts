import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {World} from '../../../types';
import {Camera} from '../../components/camera';
import {CameraActive} from '../../components/camera-active';
import {Mesh} from '../../components/mesh';
import {Position} from '../../components/position';

export function glCameraWorldCoordinatesSystem() {
  const entityQuery = defineQuery([Position, Mesh]);
  const cameraQuery = defineQuery([Camera, CameraActive]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);
    const [cameraId] = cameraQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const mesh = world.meshes.get(id);
      if (!mesh) continue;

      m4.transpose(
        m4.inverse(
          mesh.uniforms.u_world,
          mesh.uniforms.u_worldInverseTranspose
        ),
        mesh.uniforms.u_worldInverseTranspose
      );

      const camera = world.cameras.get(cameraId);
      if (!camera) throw new Error('no camera found');
      m4.multiply(
        camera.viewProjection,
        mesh.uniforms.u_world,
        mesh.uniforms.u_worldViewProjection
      );
    }

    return world;
  });
}
