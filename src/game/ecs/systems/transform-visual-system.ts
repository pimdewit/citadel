import {defineQuery, defineSystem} from 'bitecs';
import {m4} from 'twgl.js';
import {Camera} from '../../lib/camera';
import {setVector3} from '../../lib/vector3/set-vector3';
import {Transform} from '../components/transform';
import {VisualBox} from '../components/visual-box';
import {visualMeshes} from '../shared-entities';

export function transformVisualSystem(camera: Camera) {
  const entityQuery = defineQuery([VisualBox, Transform]);

  return defineSystem(world => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const mesh = visualMeshes.get(id);
      if (!mesh) continue;

      const world = mesh.uniforms.u_world;
      m4.identity(world);

      setVector3(
        mesh.position,
        Transform.positionX[id],
        Transform.positionY[id],
        Transform.positionZ[id]
      );
      setVector3(
        mesh.rotation,
        Transform.rotationX[id],
        Transform.rotationY[id],
        Transform.rotationZ[id]
      );
      setVector3(
        mesh.scale,
        Transform.scaleX[id],
        Transform.scaleY[id],
        Transform.scaleZ[id]
      );
      mesh.applyTransform(world);

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
