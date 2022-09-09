import {createTexture} from 'twgl.js';

export function debug(gl: WebGLRenderingContext) {
  return createTexture(gl, {
    min: gl.NEAREST,
    mag: gl.NEAREST,
    // prettier-ignore
    src: [
      255, 255, 255, 255,
      24,  24,  24,  255,
      192, 192, 192, 255,
      255, 255, 255, 255,
    ],
  });
}
