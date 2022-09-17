import {IWorld} from 'bitecs';
import {Mesh, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {Keyboard} from './lib/input/keyboard';
import {DragPointer} from './lib/input/pointer/drag-pointer';

export type RenderPipeline = (...input: any[]) => any;

export interface World extends IWorld {
  renderer: WebGLRenderer;
  scene: Scene;
  meshes: Map<number, Mesh>;
  cameras: Map<number, PerspectiveCamera>;
  keyboard: Keyboard;
  pointer: DragPointer;
}
