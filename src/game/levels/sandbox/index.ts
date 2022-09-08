import {pipe} from 'bitecs';
import {drawObjectList} from 'twgl.js';
import {visualMeshes} from '../../ecs/shared-entities';
import {transformSystem} from '../../ecs/systems/transform-system';
import {transformVisualSystem} from '../../ecs/systems/transform-visual-system';
import {visualSystem} from '../../ecs/systems/visual-system';
import {Camera} from '../../lib/camera';
import {setVector3} from '../../lib/vector3/set-vector3';
import {RenderPipeline} from '../../types';
import {Data} from './data';

export class Sandbox {
  readonly camera = new Camera();
  readonly data = new Data();
  readonly renderPipeline: RenderPipeline;

  constructor(readonly gl: WebGLRenderingContext) {
    this.camera.aspect = gl.canvas.width / gl.canvas.height;

    this.renderPipeline = pipe(
      // Visual representations of the entities.
      visualSystem(gl, this.camera), // Position, rotation, scale and their
      // velocities.
      transformSystem(), // Apply transform to visuals.
      transformVisualSystem(this.camera)
    );
  }

  update() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    setVector3(this.camera.position, 0, 0, -20);
    this.camera.update();

    this.renderPipeline(this.data.world);

    drawObjectList(this.gl, Array.from(visualMeshes.values()));
  }
}
