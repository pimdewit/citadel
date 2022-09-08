import {pipe} from 'bitecs';
import {drawObjectList} from 'twgl.js';
import {visualMeshes} from '../../ecs/shared-entities';
import {movementThroughKeyboardSystem} from '../../ecs/systems/movement-through-keyboard-input';
import {transformSystem} from '../../ecs/systems/transform-system';
import {transformVisualSystem} from '../../ecs/systems/transform-visual-system';
import {visualSystem} from '../../ecs/systems/visual-system';
import {Camera} from '../../lib/camera';
import {Keyboard} from '../../lib/input/keyboard';
import {commonKeys} from '../../lib/input/keyboard/common-keys';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {RenderPipeline} from '../../types';
import {Data} from './data';

export class Sandbox {
  readonly camera = new Camera();
  readonly data = new Data();
  readonly renderPipeline: RenderPipeline;
  readonly keyboard = new Keyboard();

  constructor(readonly gl: WebGLRenderingContext) {
    this.keyboard.addKeys(commonKeys);
    this.camera.aspect = gl.canvas.width / gl.canvas.height;

    this.renderPipeline = pipe(
      visualSystem(gl, this.camera),
      transformSystem(),
      movementThroughKeyboardSystem(this.keyboard),
      transformVisualSystem(this.camera)
    );
  }

  update() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    setVector3(this.camera.position, 0, 10, 20);
    this.camera.update();

    this.renderPipeline(this.data.world);

    drawObjectList(this.gl, Array.from(visualMeshes.values()));
  }
}
