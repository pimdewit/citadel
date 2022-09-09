import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {geometry, GeometryIdentifier} from '../../../_resources/geometry';
import {program, ProgramIdentifier} from '../../../_resources/programs';
import {debugGridUniforms} from '../../../_resources/programs/debug-grid';
import {Mesh as MeshGl} from '../../../lib/gl/mesh';
import {World} from '../../../types';
import {Camera} from '../../components/camera';
import {CameraActive} from '../../components/camera-active';
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
      const id = entitiesEntered[i];

      const bufferInfo = geometry(GeometryIdentifier.BOX);
      const programInfo = program(ProgramIdentifier.DEBUG_GRID);
      const uniforms = debugGridUniforms();
      const mesh = new MeshGl(programInfo, bufferInfo, uniforms);

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

export {glMeshSystem};
