import {RingGeometry} from 'three';

export function ring() {
  const geometry = new RingGeometry(0.95);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}
