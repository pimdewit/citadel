import {Material} from "three";
import {debugGrid} from "./debug-grid";
import {phong} from "./phong";
import {unlit} from "./unlit";

const PROGRAMS = new Map<number, Material>();

export enum ProgramIdentifier {
  DEBUG_GRID,
  UNLIT,
  PHONG,
}

let hasPrograms = false;

export function populatePrograms() {
  PROGRAMS.set(ProgramIdentifier.DEBUG_GRID, debugGrid());
  PROGRAMS.set(ProgramIdentifier.UNLIT, unlit());
  PROGRAMS.set(ProgramIdentifier.PHONG, phong());
  hasPrograms = true;
}

export function program(identifier: ProgramIdentifier) {
  if (!hasPrograms) throw new Error('Programs not initialised yet');
  return PROGRAMS.get(identifier)!;
}
