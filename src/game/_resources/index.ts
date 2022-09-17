import {populateGeometries} from './geometry';
import {populateTextures} from './textures';
import {populatePrograms} from './programs';

export function createResources() {
  populateGeometries();
  populateTextures();
  populatePrograms();
}
