import {defineQuery, defineSystem, hasComponent} from 'bitecs';
import {degToRad} from '../../../lib/math/deg-to-rad';
import {distanceTo} from '../../../lib/math/vector3/distance-to';
import {setVector3} from '../../../lib/math/vector3/set-vector3';
import {World} from '../../../types';
import {Angle} from '../../components/angle';
import {Camera} from '../../components/camera/camera';
import {CameraActive} from '../../components/camera/camera-active';
import {CameraPerspective} from '../../components/camera/camera-perspective';
import {Position} from '../../components/position';

export function glCameraPositionSystem() {
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

      setVector3(
        camera.position,
        Position.x[id],
        Position.y[id],
        Position.z[id]
      );

      if (hasComponent(world, Angle, id)) {
        const distance = distanceTo(camera.target, camera.position);
        Angle.x[id] = 90 + world.pointer.position[0] * 360;
        const radiansX = degToRad(Angle.x[id]);

        const x = camera.target[0] + Math.cos(radiansX) * distance;
        const z = camera.target[2] + Math.sin(radiansX) * distance;

        setVector3(camera.position, x, Position.y[id], z);
      }
    }

    return world;
  });
}
