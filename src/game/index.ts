import {createResources} from './_resources';
import {Sandbox} from './levels/sandbox';
import {resize} from './lib/gl/resize';
import {setup} from './lib/gl/setup';

export class Game {
  readonly gl: WebGLRenderingContext;
  private readonly level: Sandbox;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.gl = canvas.getContext('webgl2', {
      antialias: false,
      failIfMajorPerformanceCaveat: true,
    })!;

    setup(this.gl);
    createResources(this.gl);

    this.level = new Sandbox(this.gl);
  }

  readonly resize = () => {
    resize(this.gl);
    this.level.resize();
  };

  render = () => {
    this.level.update();
    window.requestAnimationFrame(this.render);
  };
}
