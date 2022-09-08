import {defineQuery, defineSystem, enterQuery, exitQuery, IWorld} from 'bitecs';
import {primitives} from 'twgl.js';
import {program, ProgramIdentifier} from '../../_resources/programs';
import {phongUniforms} from '../../_resources/programs/phong';
import {texture, TextureIdentifier} from '../../_resources/textures';
import {Camera} from '../../lib/camera';
import {Mesh} from '../../lib/mesh';
import {Transform} from '../components/transform';
import {VisualBox} from '../components/visual-box';
import {visualMeshes} from '../shared-entities';

function visualSystem(gl: WebGLRenderingContext, camera: Camera) {
  const entityQuery = defineQuery([Transform, VisualBox]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: IWorld) => {
    const entitiesEntered = entityQueryEnter(world);
    for (let i = 0; i < entitiesEntered.length; ++i) {
      const id = entitiesEntered[i];

      const bufferInfo = primitives.createCubeBufferInfo(gl, 2);
      const programInfo = program(ProgramIdentifier.PHONG);
      const uniforms = phongUniforms(
        texture(TextureIdentifier.DEBUG),
        camera.id
      );
      const mesh = new Mesh(programInfo, bufferInfo, uniforms);

      visualMeshes.set(id, mesh);
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const id = entitiesExited[i];
      if (visualMeshes.has(id)) visualMeshes.delete(id);
    }

    return world;
  });
}

export {visualSystem};
