import {primitives} from 'twgl.js';

export function plane(gl: WebGLRenderingContext) {
  return primitives.createPlaneBufferInfo(gl, 16, 16);
}
