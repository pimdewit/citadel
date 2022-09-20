import {BoxGeometry} from 'three';

export function box() {
  const geometry = new BoxGeometry(1, 1, 1);
  geometry.translate(0, 0.5, 0);

  return geometry;
}
