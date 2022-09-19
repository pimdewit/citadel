import {Material} from 'three';
import {debugGrid} from './debug-grid';
import {phong} from './phong';
import {unlit} from './unlit';

export enum ProgramIdentifier {
  DEBUG_GRID,
  UNLIT,
  PHONG,
}

export function programs() {
  const programMap = new Map<number, Material>();
  programMap.set(ProgramIdentifier.DEBUG_GRID, debugGrid());
  programMap.set(ProgramIdentifier.UNLIT, unlit());
  programMap.set(ProgramIdentifier.PHONG, phong());

  return (identifier: ProgramIdentifier) => programMap.get(identifier)!;
}
