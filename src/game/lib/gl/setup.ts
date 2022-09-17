import {setDefaults} from 'twgl.js';
import {populateGeometries} from '../../_resources/geometry';
import {populatePrograms} from '../../_resources/programs';
import {populateTextures} from '../../_resources/textures';

export function setup(gl: WebGLRenderingContext) {
  setDefaults({attribPrefix: 'a_'});
  populateGeometries();
  populateTextures();
  populatePrograms();
}
