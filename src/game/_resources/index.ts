import {BufferGeometry, Color, Material, Texture} from 'three';
import {ColorIdentifier, colors} from './colors';
import {GeometryIdentifier, geometries} from './geometry';
import {textures, TextureIdentifier} from './textures';
import {programs, ProgramIdentifier} from './programs';

export interface Resources {
  colors: (identifier: ColorIdentifier) => Color;
  textures: (identifier: TextureIdentifier) => Texture;
  geometries: (identifier: GeometryIdentifier) => BufferGeometry;
  programs: (identifier: ProgramIdentifier) => Material;
}

export function createResources() {
  return {
    colors: colors(),
    textures: textures(),
    geometries: geometries(),
    programs: programs(),
  };
}
