import {BoxGeometry, BufferGeometry, SphereGeometry} from 'three';
import {plane} from './plane';
import {ring} from './ring';

export enum GeometryIdentifier {
  PLANE,
  BOX,
  DISC,
  SPHERE,
}

export function geometries() {
  const geometryMap = new Map<number, BufferGeometry>();
  geometryMap.set(GeometryIdentifier.BOX, new BoxGeometry());
  geometryMap.set(GeometryIdentifier.PLANE, plane());
  geometryMap.set(GeometryIdentifier.DISC, ring());
  geometryMap.set(GeometryIdentifier.SPHERE, new SphereGeometry(0.2, 4, 3));

  return (identifier: GeometryIdentifier) => geometryMap.get(identifier)!;
}
