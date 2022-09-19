import {BufferGeometry, Material, Texture} from 'three';
import {GeometryIdentifier, geometries} from './geometry';
import {textures, TextureIdentifier} from './textures';
import {programs, ProgramIdentifier} from './programs';

export interface Resources {
  geometries: (identifier: GeometryIdentifier) => BufferGeometry;
  textures: (identifier: TextureIdentifier) => Texture;
  programs: (identifier: ProgramIdentifier) => Material;
}

export function createResources() {
  return {
    geometries: geometries(),
    textures: textures(),
    programs: programs(),
  };
}
