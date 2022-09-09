import {createTexture} from 'twgl.js';

export function debug(gl: WebGLRenderingContext) {
  return createTexture(gl, {
    mag: gl.NEAREST,
    min: gl.LINEAR,
    format: gl.LUMINANCE,
    src: new Uint8Array([255, 128, 255, 128, 255, 128, 255, 128]),
    width: 1,
  });
}
