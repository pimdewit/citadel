import {BufferGeometry, SphereGeometry} from 'three';
import {box} from './box';
import {plane} from './plane';
import {ring} from './ring';

export enum GeometryIdentifier {
  EMPTY_BUFFER,
  PLANE,
  BOX,
  DISC,
  SPHERE,
}

export function geometries() {
  const geometryMap = new Map<number, BufferGeometry>();
  geometryMap.set(GeometryIdentifier.EMPTY_BUFFER, new BufferGeometry());
  geometryMap.set(GeometryIdentifier.BOX, box());
  geometryMap.set(GeometryIdentifier.PLANE, plane());
  geometryMap.set(GeometryIdentifier.DISC, ring());
  geometryMap.set(GeometryIdentifier.SPHERE, new SphereGeometry(0.2, 4, 3));

  return (identifier: GeometryIdentifier) => geometryMap.get(identifier)!;
}
