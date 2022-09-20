import {Material} from 'three';
import {debugGrid} from './debug-grid';
import {lineDefault} from './line-default';
import {phong} from './phong';
import {unlit} from './unlit';

export enum ProgramIdentifier {
  DEBUG_GRID,
  UNLIT,
  PHONG,
  LINE_DEFAULT,
}

export function programs() {
  const programMap = new Map<number, Material>();
  programMap.set(ProgramIdentifier.DEBUG_GRID, debugGrid());
  programMap.set(ProgramIdentifier.UNLIT, unlit());
  programMap.set(ProgramIdentifier.PHONG, phong());
  programMap.set(ProgramIdentifier.LINE_DEFAULT, lineDefault());

  return (identifier: ProgramIdentifier) => programMap.get(identifier)!;
}
