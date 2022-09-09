import {primitives} from 'twgl.js';

export function disc(gl: WebGLRenderingContext) {
  return primitives.createDiscBufferInfo(gl, 1, 32, 1, 0.99);
}
