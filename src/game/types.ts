import {IWorld} from 'bitecs';
import {Object3D, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Resources} from './_resources';
import {Keyboard} from './lib/input/keyboard';

/** All entity systems and behaviours. */
export type RenderPipeline = (...input: any[]) => any;

export interface World extends IWorld {
  // Resources.
  resources: Resources;
  // Viewport dimensions.
  viewport: Int16Array;
  // The main scene.
  scene: Scene;
  // Collection of scene graph nodes.
  meshes: Map<number, Object3D>;
  groups: Map<number, Object3D>;
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
