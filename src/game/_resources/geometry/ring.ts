import {RingGeometry} from 'three';

export function ring() {
  const geometry = new RingGeometry(0.99, 1, 32);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}
