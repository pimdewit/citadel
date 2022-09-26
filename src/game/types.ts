import {IWorld} from 'bitecs';
import {Object3D, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Resources} from './_resources';
import {Keyboard} from './lib/input/keyboard';

export enum TOGGLE_BINARY {
  FALSE,
  TRUE,
}

/** All entity systems and behaviours. */
export type RenderPipeline = (...input: any[]) => any;

export interface World extends IWorld {
  // Resources.
  resources: Resources;
  // The main scene.
  scene: Scene;
  towerLines: Map<number, Object3D>;
  // Collection of scene graph nodes.
  sceneGraphNodes: Map<number, Object3D>;
  // Collection of cameras.
  cameras: Map<number, PerspectiveCamera>;
  // Keyboard input.
  keyboard: Keyboard;
  // Graphics renderer.
  renderer: WebGLRenderer;
  // Resize handler.
  resize: (width: number, height: number, dpr: number) => void;
}
