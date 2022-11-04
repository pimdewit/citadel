import {LoadingManager, Texture, TextureLoader, WebGLRenderer} from 'three';
import {KTX2Loader} from 'three/examples/jsm/loaders/KTX2Loader';
import {resourceEventDispatcher, ResourceEventName} from '../events';
import {debug} from './debug';
import {TextureIdentifier, textureMapData} from './texture-map-data';

const ktx2TranscoderPath = new URL(
  '../../../../webgl/libraries/basis/',
  import.meta.url
).href;

const loadingManager = new LoadingManager();
const textureLoader = new TextureLoader(loadingManager);
const ktx2Loader = new KTX2Loader(loadingManager);

export function textures(renderer: WebGLRenderer) {
  ktx2Loader.setTranscoderPath(`${ktx2TranscoderPath}/`);
  ktx2Loader.detectSupport(renderer);

  const textureMap = new Map<number, Texture>();
  textureMap.set(TextureIdentifier.DEBUG, debug());

  const baseTexture = debug();

  for (const entry of textureMapData) {
    const loader = entry.ktx2 ? ktx2Loader : textureLoader;
    const path = entry.ktx2 ?? entry.image;

    // Set the temporary texture until the actual texture has loaded.
    const textureClone = baseTexture.clone();
    textureMap.set(entry.identifier, textureClone);

    loader.load(path, texture => {
      if (entry.wrapping) {
        texture.wrapT = entry.wrapping;
        texture.wrapS = entry.wrapping;
      }

      if (entry.repeat) texture.repeat.copy(entry.repeat);
      textureClone.dispose();
      textureMap.set(entry.identifier, texture);

      // @TODO: Remove nasty event-driven logic.
      // Fire an event to notify the texture has been loaded.
      resourceEventDispatcher.dispatch(
        ResourceEventName.DOWNLOADED,
        entry.identifier
      );
    });
  }

  return (identifier: TextureIdentifier) => textureMap.get(identifier)!;
}
