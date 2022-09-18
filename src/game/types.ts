import {IWorld} from 'bitecs';
import {Mesh, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {Keyboard} from './lib/input/keyboard';

export type RenderPipeline = (...input: any[]) => any;

export interface World extends IWorld {
  // Viewport dimensions.
  viewport: Int16Array;
  // The main scene.
  scene: Scene;
  // Collection of meshes.
  meshes: Map<number, Mesh>;
  // Collection of cameras.
  cameras: Map<number, PerspectiveCamera>;
  // Keyboard input.
  keyboard: Keyboard;
  // Graphics renderer.
  renderer: WebGLRenderer;
  // Resize handler.
  resize: (width: number, height: number, dpr: number) => void;
}
