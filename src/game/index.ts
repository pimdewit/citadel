import {WebGLRenderer} from 'three';
import {createResources} from './_resources';
import {createWorld} from './ecs/create-world';
import {renderPipeline} from './ecs/render-pipeline';
import {RenderPipeline, World} from './types';

export class Game {
  readonly renderer: WebGLRenderer;
  readonly world: World;
  readonly renderPipeline: RenderPipeline;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({canvas, antialias: false});
    createResources();

    this.world = createWorld(this.renderer);
    this.renderPipeline = renderPipeline();

    // Render once for a direct visual and to transfer to gpu.
    this.render();
  }

  readonly render = () => {
    this.renderPipeline(this.world);
  };
}
