import {pipe} from 'bitecs';
import {angleRenderSystem} from '../../ecs/systems/angle-render-system';
import {angleSystem} from '../../ecs/systems/angle-system';
import {cameraProjectionSystem} from '../../ecs/systems/camera-projection-system';
import {cameraWorldCoordinatesSystem} from '../../ecs/systems/camera-world-coordinates-system';
import {glCameraSystem} from '../../ecs/systems/gl-camera-system';
import {glScaleSystem} from '../../ecs/systems/gl-scale-system';
import {movementThroughKeyboardSystem} from '../../ecs/systems/movement-through-keyboard-input';
import {positionInterpolationSystem} from '../../ecs/systems/position-interpolation-system';
import {positionRenderSystem} from '../../ecs/systems/position-render-system';
import {positionSystem} from '../../ecs/systems/position-system';
import {renderSystem} from '../../ecs/systems/render-system';
import {glMeshSystem} from '../../ecs/systems/gl-mesh-system';
import {World} from '../../types';

export function renderPipeline(world: World) {
  return pipe(
    // GL Setup.
    glCameraSystem(),
    glMeshSystem(),
    // Transforms.
    angleSystem(),
    movementThroughKeyboardSystem(),
    positionSystem(),
    positionInterpolationSystem(),
    // Cameras.
    cameraProjectionSystem(),
    // Meshes.
    positionRenderSystem(),
    angleRenderSystem(),
    glScaleSystem(),
    // Shaders.
    cameraWorldCoordinatesSystem(),
    // Rendering.
    renderSystem()
  );
}
