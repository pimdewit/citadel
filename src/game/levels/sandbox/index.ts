import {pipe} from 'bitecs';
import {drawObjectList} from 'twgl.js';
import {visualMeshes} from '../../ecs/shared-entities';
import {angleRenderSystem} from '../../ecs/systems/angle-render-system';
import {angleSystem} from '../../ecs/systems/angle-system';
import {cameraProjectionSystem} from '../../ecs/systems/camera-projection-system';
import {cameraWorldCoordinatesSystem} from '../../ecs/systems/camera-world-coordinates-system';
import {glCameraSystem} from '../../ecs/systems/gl-camera-system';
import {movementThroughKeyboardSystem} from '../../ecs/systems/movement-through-keyboard-input';
import {positionInterpolationSystem} from '../../ecs/systems/position-interpolation-system';
import {positionRenderSystem} from '../../ecs/systems/position-render-system';
import {positionSystem} from '../../ecs/systems/position-system';
import {renderSystem} from '../../ecs/systems/render-system';
import {visualSystem} from '../../ecs/systems/visual-system';
import {Camera} from '../../lib/camera';
import {Keyboard} from '../../lib/input/keyboard';
import {commonKeys} from '../../lib/input/keyboard/common-keys';
import {RenderPipeline} from '../../types';
import {Data} from './data';

export class Sandbox {
  readonly camera = new Camera();
  readonly data = new Data();
  readonly renderPipeline: RenderPipeline;
  readonly keyboard = new Keyboard();

  constructor(readonly gl: WebGLRenderingContext) {
    this.keyboard.addKeys(commonKeys);

    this.renderPipeline = pipe(
      // GL Setup.
      glCameraSystem(),
      visualSystem(gl),
      // Transforms.
      angleSystem(),
      movementThroughKeyboardSystem(this.keyboard),
      positionSystem(),
      positionInterpolationSystem(),
      // Cameras.
      cameraProjectionSystem(),
      // Meshes.
      positionRenderSystem(),
      angleRenderSystem(),
      // Shaders.
      cameraWorldCoordinatesSystem(),
      // Rendering.
      renderSystem(gl)
    );
  }

  update() {
    this.renderPipeline(this.data.world);
  }
}
