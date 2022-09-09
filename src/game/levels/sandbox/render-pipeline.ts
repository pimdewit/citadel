import {pipe} from 'bitecs';
import {angleSystem} from '../../ecs/systems/angle-system';
import {glAngleSystem} from '../../ecs/systems/gl/gl-angle-system';
import {glCameraProjectionSystem} from '../../ecs/systems/gl/gl-camera-projection-system';
import {glCameraSystem} from '../../ecs/systems/gl/gl-camera-system';
import {glCameraWorldCoordinatesSystem} from '../../ecs/systems/gl/gl-camera-world-coordinates-system';
import {glMeshSystem} from '../../ecs/systems/gl/gl-mesh-system';
import {glPositionSystem} from '../../ecs/systems/gl/gl-position-system';
import {glRenderSystem} from '../../ecs/systems/gl/gl-render-system';
import {glScaleSystem} from '../../ecs/systems/gl/gl-scale-system';
import {movementThroughKeyboardSystem} from '../../ecs/systems/movement-through-keyboard-input';
import {positionInterpolationSystem} from '../../ecs/systems/position-interpolation-system';
import {positionSystem} from '../../ecs/systems/position-system';
import {visionMeshSystem} from '../../ecs/systems/vision-mesh-system';

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
    // Cameras.
    glCameraProjectionSystem(),
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
