import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {geometry} from '../../../_resources/geometry';
import {program} from '../../../_resources/programs';
import {uniformsFactory} from '../../../_resources/programs/uniforms';
import {Mesh as MeshGl} from '../../../lib/gl/mesh';
import {World} from '../../../types';
import {Camera} from '../../components/camera/camera';
import {CameraActive} from '../../components/camera/camera-active';
import {Mesh} from '../../components/mesh';
import {Position} from '../../components/position';

function glMeshSystem() {
  const entityQuery = defineQuery([Position, Mesh]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);
  const cameraQuery = defineQuery([Camera, CameraActive]);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);
    const [cameraId] = cameraQuery(world);

    const camera = world.cameras.get(cameraId);
    if (!camera) throw new Error('no camera found');

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];

      const bufferInfo = geometry(Mesh.bufferInfo[entity]);
      const programInfo = program(Mesh.program[entity]);
      const uniforms = uniformsFactory(world, Mesh.program[entity]);
      const mesh = new MeshGl(programInfo, bufferInfo, uniforms);

      world.meshes.set(entity, mesh);
    }

    const entitiesExited = entityQueryExit(world);
    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      if (world.meshes.has(entity)) world.meshes.delete(entity);
    }

    return world;
  });
}

export {glMeshSystem};
