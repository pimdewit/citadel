import {populateTextures} from './textures';
import {populatePrograms} from './programs';

export function createResources(gl: WebGLRenderingContext) {
  populateTextures(gl);
  populatePrograms(gl);
}
