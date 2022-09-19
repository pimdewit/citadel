import {pipe} from 'bitecs';
import {angleSystem} from './systems/angle-system';
import {damageSystem} from './systems/damage-system';
import {movementThroughKeyboardSystem} from './systems/movement-through-keyboard-input';
import {positionInterpolationSystem} from './systems/position-interpolation-system';
import {positionSystem} from './systems/position-system';
import {cameraPositionSystem} from './systems/three/camera-position-system';
import {cameraProjectionSystem} from './systems/three/camera-projection-system';
import {cameraSpawnSystem} from './systems/three/camera-spawn-system';
import {meshSpawnSystem} from './systems/three/mesh-spawn-system';
import {object3dAngleSystem} from './systems/three/object3d-angle-system';
import {object3dPositionSystem} from './systems/three/object3d-position-system';
import {object3dScaleSystem} from './systems/three/object3d-scale-system';
import {renderSystem} from './systems/three/render-system';
import {visionMeshSystem} from './systems/vision-mesh-system';
import {visionSystem} from './systems/vision-system';

export function renderPipeline() {
  return pipe(
    /** USER INPUT --------------------------------------------------------- */

    movementThroughKeyboardSystem(),

    /** PURE DATA ---------------------------------------------------------- */

    // Transforms.
    positionInterpolationSystem(),
    angleSystem(),
    positionSystem(),

    // Battle.
    visionSystem(),
    damageSystem(),

    /** GRAPHICS ----------------------------------------------------------- */

    // Object generation.
    cameraSpawnSystem(),
    meshSpawnSystem(),
    visionMeshSystem(),

    // Cameras.
    cameraProjectionSystem(),
    cameraPositionSystem(),

    // Mesh.
    object3dAngleSystem(),
    object3dPositionSystem(),
    object3dScaleSystem(),

    // Rendering.
    renderSystem()
  );
}