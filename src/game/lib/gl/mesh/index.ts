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

  /** Applies the current transform. */
  applyTransform(world: m4.Mat4) {
    m4.translate(world, this.position, world);
    m4.rotateX(world, this.rotation[0], world);
    m4.rotateY(world, this.rotation[1], world);
    m4.rotateZ(world, this.rotation[2], world);
    m4.scale(world, this.scale, world);
  }
}
