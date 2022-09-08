import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {primitives} from 'twgl.js';
import {program, ProgramIdentifier} from '../../_resources/programs';
import {phongUniforms} from '../../_resources/programs/phong';
import {texture, TextureIdentifier} from '../../_resources/textures';
import {Mesh} from '../../lib/gl/mesh';
import {World} from '../../types';
import {Camera} from '../components/camera';
import {CameraActive} from '../components/camera-active';
import {Position} from '../components/position';
import {VisualBox} from '../components/visual-box';

function visualSystem(gl: WebGLRenderingContext) {
  const entityQuery = defineQuery([Position, VisualBox]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);
  const cameraQuery = defineQuery([Camera, CameraActive]);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);
    const [cameraId] = cameraQuery(world);

    const camera = world.cameras.get(cameraId);
    if (!camera) throw new Error('no camera found');

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const id = entitiesEntered[i];

      const bufferInfo = primitives.createCubeBufferInfo(gl, 2);
      const programInfo = program(ProgramIdentifier.PHONG);
      const uniforms = phongUniforms(
        texture(TextureIdentifier.DEBUG),
        camera.id
      );
      const mesh = new Mesh(programInfo, bufferInfo, uniforms);

      world.meshes.set(id, mesh);
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const id = entitiesExited[i];
      if (world.meshes.has(id)) world.meshes.delete(id);
    }

    return world;
  });
}

export {visualSystem};
