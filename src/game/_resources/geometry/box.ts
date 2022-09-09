import {primitives} from 'twgl.js';

export function box(gl: WebGLRenderingContext) {
  return primitives.createCubeBufferInfo(gl);
}
