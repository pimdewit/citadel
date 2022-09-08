import {BufferInfo, m4, ProgramInfo} from 'twgl.js';
import {vector3} from '../../math/vector3';

export class Mesh<T = {[key: string]: any}> {
  readonly id = m4.identity();
  readonly position = vector3(0, 0, 0);
  readonly rotation = vector3(0, 0, 0);
  readonly scale = vector3(1, 1, 1);

  constructor(
    readonly programInfo: ProgramInfo,
    readonly bufferInfo: BufferInfo,
    readonly uniforms: T
  ) {}
}
