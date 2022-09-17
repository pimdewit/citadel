import {pipe} from 'bitecs';
import {angleSystem} from '../../ecs/systems/angle-system';
import {cameraPositionSystem} from '../../ecs/systems/three/camera-position-system';
import {CameraProjectionSystem} from '../../ecs/systems/three/camera-projection-system';
import {CameraSpawnSystem} from '../../ecs/systems/three/camera-spawn-system';
import {damageSystem} from '../../ecs/systems/damage-system';
import {meshAngleSystem} from '../../ecs/systems/three/mesh-angle-system';
import {meshPositionSystem} from '../../ecs/systems/three/mesh-position-system';
import {meshScaleSystem} from '../../ecs/systems/three/mesh-scale-system';
import {meshSpawnSystem} from '../../ecs/systems/three/mesh-spawn-system';
import {movementThroughKeyboardSystem} from '../../ecs/systems/movement-through-keyboard-input';
import {positionInterpolationSystem} from '../../ecs/systems/position-interpolation-system';
import {positionSystem} from '../../ecs/systems/position-system';
import {renderSystem} from '../../ecs/systems/three/render-system';
import {visionMeshSystem} from '../../ecs/systems/vision-mesh-system';
import {visionSystem} from '../../ecs/systems/vision-system';

export function renderPipeline() {
  return pipe(
    // Object preparation.
    visionMeshSystem(),

    // GL Setup.
    CameraSpawnSystem(),
    meshSpawnSystem(),

    // Transforms.
    angleSystem(),
    movementThroughKeyboardSystem(),
    positionSystem(),
    positionInterpolationSystem(),

    // Battle.
    visionSystem(),
    damageSystem(),

    // Cameras.
    CameraProjectionSystem(),
    cameraPositionSystem(),

    // Mesh.
    meshAngleSystem(),
    meshPositionSystem(),
    meshScaleSystem(),

    // Meshes.
    // glPositionSystem(),
    // glAngleSystem(),
    // glScaleSystem(),

    // Shaders.
    // glCameraWorldCoordinatesSystem(),

    // Rendering.
    renderSystem()
  );
}
