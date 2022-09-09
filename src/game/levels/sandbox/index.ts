import {CameraPerspective} from '../../ecs/components/camera-perspective';
import {resize} from '../../lib/gl/resize';
import {RenderPipeline, World} from '../../types';
import {createWorld} from './create-world';
import {renderPipeline} from './render-pipeline';

export class Sandbox {
  readonly world: World;
  readonly renderPipeline: RenderPipeline;

  constructor(readonly gl: WebGLRenderingContext) {
    this.world = createWorld(gl);
    this.renderPipeline = renderPipeline(this.world);
  }

  readonly resize = () => {
    const gl = this.world.gl;
    resize(gl);
    for (const id of this.world.cameras.keys()) {
      CameraPerspective.aspect[id] = gl.canvas.width / gl.canvas.height;
    }
  };

  update() {
    this.renderPipeline(this.world);
  }
}
