import {pipe} from 'bitecs';
import {angleSystem} from './systems/angle-system';
import {damageSystem} from './systems/damage-system';
import {enemyRevealedSystem} from './systems/enemy-revealed-system';
import {movementThroughKeyboardSystem} from './systems/movement-through-keyboard-input';
import {positionInterpolationSystem} from './systems/position-interpolation-system';
import {positionSystem} from './systems/position-system';
import {cameraControlsSystem} from './systems/three/camera-controls-system';
import {cameraPositionSystem} from './systems/three/camera-position-system';
import {cameraProjectionSystem} from './systems/three/camera-projection-system';
import {cameraSpawnSystem} from './systems/three/camera-spawn-system';
import {object3dSystem} from './systems/three/object3d-system';
import {object3dAngleSystem} from './systems/three/object3d-angle-system';
import {object3dPositionSystem} from './systems/three/object3d-position-system';
import {object3dScaleSystem} from './systems/three/object3d-scale-system';
import {renderSystem} from './systems/three/render-system';
import {visionDetectedSystem} from './systems/vision-detected-system';
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

    // Scene graph management.
    cameraSpawnSystem(),
    object3dSystem(),
    visionMeshSystem(),
    visionDetectedSystem(),

    enemyRevealedSystem(),

    // Cameras.
    cameraProjectionSystem(),
    cameraPositionSystem(),
    cameraControlsSystem(),

    // Mesh.
    object3dAngleSystem(),
    object3dPositionSystem(),
    object3dScaleSystem(),

    // Rendering.
    renderSystem()
  );
}
