import {debug} from './debug';

const TEXTURES = new Map<number, WebGLTexture>();

export enum TextureIdentifier {
  DEBUG,
}

let hasTextures = false;

export function populateTextures(gl: WebGLRenderingContext) {
  TEXTURES.set(TextureIdentifier.DEBUG, debug(gl));
  hasTextures = true;
}

export function texture(identifier: TextureIdentifier) {
  if (!hasTextures) throw new Error('Textures not initialised yet');
  return TEXTURES.get(identifier)!;
}
