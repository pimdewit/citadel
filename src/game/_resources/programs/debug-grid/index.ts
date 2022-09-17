import {MeshBasicMaterial} from 'three';
import {texture, TextureIdentifier} from '../../textures';

export function debugGrid() {
  return new MeshBasicMaterial({
    map: texture(TextureIdentifier.DEBUG),
  });
}
