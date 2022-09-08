import {populateTextures} from './textures';
import {populatePrograms} from './programs';
import {resizeCanvasToDisplaySize, setDefaults} from 'twgl.js';

export function createResources(gl: WebGLRenderingContext) {
  populateTextures(gl);
  populatePrograms(gl);
}
