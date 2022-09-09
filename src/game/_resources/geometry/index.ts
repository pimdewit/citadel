import {BufferInfo} from 'twgl.js';
import {box} from './box';

const GEOMETRIES = new Map<number, BufferInfo>();

export enum GeometryIdentifier {
  BOX,
}

let hasTextures = false;

export function populateGeometries(gl: WebGLRenderingContext) {
  GEOMETRIES.set(GeometryIdentifier.BOX, box(gl));
  hasTextures = true;
}

export function geometry(identifier: GeometryIdentifier) {
  if (!hasTextures) throw new Error('Base meshes not initialised yet');
  return GEOMETRIES.get(identifier)!;
}
