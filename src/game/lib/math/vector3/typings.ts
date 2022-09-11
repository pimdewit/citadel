/**
 * [x, y, z] vector representation.
 * @see {@link https://github.com/microsoft/TypeScript/issues/45547#issuecomment-904225516}
 */
import {ComponentType} from 'bitecs';

export interface Vector3 extends Float32Array {
  0: number;
  1: number;
  2: number;
  length: 3;
}

export type Vector3Component = ComponentType<{x: 'f32'; y: 'f32'; z: 'f32'}>;
