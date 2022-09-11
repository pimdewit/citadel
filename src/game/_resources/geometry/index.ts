import {BufferInfo} from 'twgl.js';
import {box} from './box';
import {disc} from './disc';
import {plane} from './plane';
import {sphere} from './sphere';

const GEOMETRIES = new Map<number, BufferInfo>();

export enum GeometryIdentifier {
  PLANE,
  BOX,
  DISC,
  SPHERE,
}

let hasTextures = false;

export function populateGeometries(gl: WebGLRenderingContext) {
  GEOMETRIES.set(GeometryIdentifier.BOX, box(gl));
  GEOMETRIES.set(GeometryIdentifier.PLANE, plane(gl));
  GEOMETRIES.set(GeometryIdentifier.DISC, disc(gl));
  GEOMETRIES.set(GeometryIdentifier.SPHERE, sphere(gl));
  hasTextures = true;
}

export function geometry(identifier: GeometryIdentifier) {
  if (!hasTextures) throw new Error('Base meshes not initialised yet');
  return GEOMETRIES.get(identifier)!;
}
