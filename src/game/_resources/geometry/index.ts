import {
  BoxGeometry,
  BufferGeometry,
  PlaneGeometry,
  RingGeometry,
  SphereGeometry,
} from 'three';
import {plane} from './plane';
import {ring} from './ring';

const GEOMETRIES = new Map<number, BufferGeometry>();

export enum GeometryIdentifier {
  PLANE,
  BOX,
  DISC,
  SPHERE,
}

let hasGeometries = false;

export function populateGeometries() {
  GEOMETRIES.set(GeometryIdentifier.BOX, new BoxGeometry());
  GEOMETRIES.set(GeometryIdentifier.PLANE, plane());
  GEOMETRIES.set(GeometryIdentifier.DISC, ring());
  GEOMETRIES.set(GeometryIdentifier.SPHERE, new SphereGeometry(0.5, 4, 3));
  hasGeometries = true;
}

export function geometry(identifier: GeometryIdentifier) {
  if (!hasGeometries) throw new Error('Base meshes not initialised yet');
  return GEOMETRIES.get(identifier)!;
}
