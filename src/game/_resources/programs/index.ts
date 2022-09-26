import {Material, Texture} from 'three';
import {TextureIdentifier} from '../textures/texture-map-data';
import {debugGrid} from './debug-grid';
import {lineDefault} from './line-default';
import {phong} from './phong';
import {shield} from './shield';
import {unlit} from './unlit';

export enum ProgramIdentifier {
  DEBUG_GRID,
  UNLIT,
  PHONG,
  LINE_DEFAULT,
  SHIELD,
}

export function programs(textures: (identifier: TextureIdentifier) => Texture) {
  const programMap = new Map<number, Material>();
  programMap.set(ProgramIdentifier.DEBUG_GRID, debugGrid());
  programMap.set(ProgramIdentifier.UNLIT, unlit());
  programMap.set(ProgramIdentifier.PHONG, phong());
  programMap.set(ProgramIdentifier.LINE_DEFAULT, lineDefault());
  programMap.set(
    ProgramIdentifier.SHIELD,
    shield(textures(TextureIdentifier.NOISE1))
  );

  return (identifier: ProgramIdentifier) => programMap.get(identifier)!;
}
