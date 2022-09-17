import {PlaneGeometry} from 'three';

export function plane() {
  const geometry = new PlaneGeometry(0.95);
  geometry.rotateX(-Math.PI / 2);

  return geometry;
}
