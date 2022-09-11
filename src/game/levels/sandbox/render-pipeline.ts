import {pipe} from 'bitecs';
import {angleSystem} from '../../ecs/systems/angle-system';
import {damageSystem} from '../../ecs/systems/damage-system';
import {glAngleSystem} from '../../ecs/systems/gl/gl-angle-system';
import {glCameraPositionSystem} from '../../ecs/systems/gl/gl-camera-position-system';
import {glCameraProjectionSystem} from '../../ecs/systems/gl/gl-camera-projection-system';
import {glCameraSystem} from '../../ecs/systems/gl/gl-camera-system';
import {glCameraUpdateSystem} from '../../ecs/systems/gl/gl-camera-update-system';
import {glCameraWorldCoordinatesSystem} from '../../ecs/systems/gl/gl-camera-world-coordinates-system';
import {glMeshSystem} from '../../ecs/systems/gl/gl-mesh-system';
import {glPositionSystem} from '../../ecs/systems/gl/gl-position-system';
import {glRenderSystem} from '../../ecs/systems/gl/gl-render-system';
import {glScaleSystem} from '../../ecs/systems/gl/gl-scale-system';
import {movementThroughKeyboardSystem} from '../../ecs/systems/movement-through-keyboard-input';
import {positionInterpolationSystem} from '../../ecs/systems/position-interpolation-system';
import {positionSystem} from '../../ecs/systems/position-system';
import {visionMeshSystem} from '../../ecs/systems/vision-mesh-system';
import {visionSystem} from '../../ecs/systems/vision-system';

export function renderPipeline() {
  return pipe(
    // Object preparation.
    visionMeshSystem(),

    // GL Setup.
    glCameraSystem(),
    glMeshSystem(),

    // Transforms.
    angleSystem(),
    movementThroughKeyboardSystem(),
    positionSystem(),
    positionInterpolationSystem(),

    // Battle.
    visionSystem(),
    damageSystem(),

    // Cameras.
    glCameraPositionSystem(),
    glCameraProjectionSystem(),
    glCameraUpdateSystem(),

    // Meshes.
    glPositionSystem(),
    glAngleSystem(),
    glScaleSystem(),

    // Shaders.
    glCameraWorldCoordinatesSystem(),

    // Rendering.
    glRenderSystem()
  );
}
