import {WebGLRenderer} from 'three';
import {createWorld} from './ecs/create-world';
import {renderPipeline} from './ecs/render-pipeline';
import {RenderPipeline, World} from './types';

export class Game {
  readonly renderer: WebGLRenderer;
  readonly world: World;
  readonly renderPipeline: RenderPipeline;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({canvas, antialias: false});
    this.world = createWorld(this.renderer);
    this.renderPipeline = renderPipeline();

    // Render once to transfer to gpu.
    this.render();

    console.log(this.world.sceneGraphNodes);
  }

  readonly render = () => {
    this.renderPipeline(this.world);
  };
}
