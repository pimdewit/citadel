import {RepeatWrapping, Vector2, Wrapping} from 'three';

export enum TextureIdentifier {
  DEBUG,
  NOISE1,
  LAYERED_NOISE,
}

const basePath = '../../../../webgl/textures/';

const layeredPerlin = new URL(`${basePath}layered-perlin.png`, import.meta.url)
  .href;
const noise1 = new URL(`${basePath}noise-64.png`, import.meta.url).href;
const noise1Ktx = new URL(`${basePath}noise-64.ktx2`, import.meta.url).href;

interface TextureMapData {
  identifier: TextureIdentifier;
  image: string;
  ktx2?: string;
  repeat?: Vector2;
  wrapping?: Wrapping;
}

export const textureMapData: TextureMapData[] = [
  {
    identifier: TextureIdentifier.NOISE1,
    ktx2: noise1Ktx,
    image: noise1,
    wrapping: RepeatWrapping,
  },
  {
    identifier: TextureIdentifier.LAYERED_NOISE,
    image: layeredPerlin,
    wrapping: RepeatWrapping,
  },
];
