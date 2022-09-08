import {setDefaults} from 'twgl.js';
import {populatePrograms} from '../../_resources/programs';
import {populateTextures} from '../../_resources/textures';

export function setup(gl: WebGLRenderingContext) {
  setDefaults({attribPrefix: 'a_'});
  populateTextures(gl);
  populatePrograms(gl);
}