import {defineQuery, defineSystem, hasComponent} from 'bitecs';
import {m4} from 'twgl.js';
import {degToRad} from '../../../lib/math/deg-to-rad';
import {vector3} from '../../../lib/math/vector3';
import {distanceTo} from '../../../lib/math/vector3/distance-to';
import {setVector3} from '../../../lib/math/vector3/set-vector3';
import {World} from '../../../types';
import {Camera} from '../../components/camera/camera';
import {CameraActive} from '../../components/camera/camera-active';
import {CameraArcRotate} from '../../components/camera/camera-arc-rotate';
import {CameraPerspective} from '../../components/camera/camera-perspective';
import {Position} from '../../components/position';

const up = vector3(0, 1, 0);

export function glCameraProjectionSystem() {
  const entityQuery = defineQuery([
    Camera,
    CameraActive,
    CameraPerspective,
    Position,
  ]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const camera = world.cameras.get(id);
      if (!camera) throw new Error('no camera found');

      const projection = m4.perspective(
        CameraPerspective.fov[id],
        CameraPerspective.aspect[id],
        CameraPerspective.near[id],
        CameraPerspective.far[id]
      );

      setVector3(
        camera.position,
        Position.x[id],
        Position.y[id],
        Position.z[id]
      );

      if (hasComponent(world, CameraArcRotate, id)) {
        const distance = distanceTo(camera.target, camera.position);
        const angle = degToRad(CameraArcRotate.angle[id]);

        setVector3(
          camera.position,
          camera.target[0] + Math.cos(angle) * distance,
          Position.y[id],
          camera.target[2] + Math.sin(angle) * distance
        );
      }

      m4.lookAt(camera.position, camera.target, up, camera.id);
      m4.inverse(camera.id, camera.view);
      m4.multiply(projection, camera.view, camera.viewProjection);
    }

    return world;
  });
}
