import {Texture} from "three";
import {debug} from './debug';

const TEXTURES = new Map<number, Texture>();

export enum TextureIdentifier {
  DEBUG,
}

let hasTextures = false;

export function populateTextures() {
  TEXTURES.set(TextureIdentifier.DEBUG, debug());
  hasTextures = true;
}

export function texture(identifier: TextureIdentifier) {
  if (!hasTextures) throw new Error('Textures not initialised yet');
  return TEXTURES.get(identifier)!;
}
