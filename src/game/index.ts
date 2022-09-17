import {WebGLRenderer} from 'three';
import {createResources} from './_resources';
import {Sandbox} from './levels/sandbox';

export class Game {
  readonly renderer: WebGLRenderer;
  private readonly level: Sandbox;

  constructor(readonly canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({canvas, antialias: false});
    createResources();

    this.level = new Sandbox(this.renderer);
  }

  readonly resize = (
    width = window.innerWidth,
    height = window.innerHeight,
    dpr = window.devicePixelRatio
  ) => {
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(dpr);
    this.level.resize(width, height);
  };

  render = () => {
    this.level.update();
    window.requestAnimationFrame(this.render);
  };
}
