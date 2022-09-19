import {Texture} from 'three';
import {debug} from './debug';

export enum TextureIdentifier {
  DEBUG,
}

export function textures() {
  const textureMap = new Map<number, Texture>();
  textureMap.set(TextureIdentifier.DEBUG, debug());

  return (identifier: TextureIdentifier) => textureMap.get(identifier)!;
}
