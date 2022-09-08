import {IWorld} from 'bitecs';
import {Camera} from './lib/camera';
import {Mesh} from './lib/gl/mesh';

export type RenderPipeline = (...input: any[]) => any;

export interface World extends IWorld {
  meshes: Map<number, Mesh>;
  cameras: Map<number, Camera>;
}
