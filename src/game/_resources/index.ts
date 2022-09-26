import {BufferGeometry, Color, Material, Texture, WebGLRenderer} from 'three';
import {ColorIdentifier, colors} from './colors';
import {GeometryIdentifier, geometries} from './geometry';
import {programs, ProgramIdentifier} from './programs';
import {textures} from './textures';
import {TextureIdentifier} from './textures/texture-map-data';

export interface Resources {
  colors: (identifier: ColorIdentifier) => Color;
  textures: (identifier: TextureIdentifier) => Texture;
  geometries: (identifier: GeometryIdentifier) => BufferGeometry;
  programs: (identifier: ProgramIdentifier) => Material;
}

export function createResources(renderer: WebGLRenderer) {
  const textureMap = textures(renderer);

  return {
    colors: colors(),
    textures: textureMap,
    geometries: geometries(),
    programs: programs(textureMap),
  };
}
