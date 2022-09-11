import {primitives} from 'twgl.js';

export function sphere(gl: WebGLRenderingContext) {
  return primitives.createSphereBufferInfo(gl, 0.5, 8, 8);
}
