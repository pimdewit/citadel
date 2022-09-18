import {DataTexture, RepeatWrapping} from 'three';

export function debug() {
  // prettier-ignore
  const src = new Uint8Array([
    255, 255, 255, 255,
    0, 0, 0, 255,
    0, 0, 0, 255,
    0, 0, 0, 255,

    0, 0, 0, 255,
    0, 0, 0, 255,
    0, 0, 0, 255,
    0, 0, 0, 255,

    0, 0, 0, 255,
    0, 0, 0, 255,
    0, 0, 0, 255,
    0, 0, 0, 255,

    0, 0, 0, 255,
    0, 0, 0, 255,
    0, 0, 0, 255,
    0, 0, 0, 255,
  ]);
  const texture = new DataTexture(src, 2, 2);
  texture.flipY = true;
  texture.repeat.set(16, 16);
  texture.wrapT = RepeatWrapping;
  texture.wrapS = RepeatWrapping;
  texture.needsUpdate = true;

  return texture;
}
