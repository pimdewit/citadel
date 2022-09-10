import {IWorld} from 'bitecs';
import {Camera} from './lib/camera';
import {Mesh} from './lib/gl/mesh';
import {Keyboard} from './lib/input/keyboard';
import {DragPointer} from './lib/input/pointer/drag-pointer';

export type RenderPipeline = (...input: any[]) => any;

export interface World extends IWorld {
  meshes: Map<number, Mesh>;
  cameras: Map<number, Camera>;
  keyboard: Keyboard;
  gl: WebGLRenderingContext;
  pointer: DragPointer;
}
