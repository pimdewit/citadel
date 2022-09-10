import {ProgramInfo} from 'twgl.js';
import {debugGrid} from './grid';
import {unlit} from './unlit';
import {phong} from './phong';

const PROGRAMS = new Map<number, ProgramInfo>();

export enum ProgramIdentifier {
  DEBUG_GRID,
  UNLIT,
  PHONG,
}

let hasPrograms = false;

export function populatePrograms(gl: WebGLRenderingContext) {
  PROGRAMS.set(ProgramIdentifier.DEBUG_GRID, debugGrid(gl));
  PROGRAMS.set(ProgramIdentifier.UNLIT, unlit(gl));
  PROGRAMS.set(ProgramIdentifier.PHONG, phong(gl));
  hasPrograms = true;
}

export function program(identifier: ProgramIdentifier) {
  if (!hasPrograms) throw new Error('Programs not initialised yet');
  return PROGRAMS.get(identifier)!;
}
