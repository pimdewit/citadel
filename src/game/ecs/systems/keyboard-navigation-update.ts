import {defineSystem} from 'bitecs';
import {World} from '../../types';

export function glRenderSystem() {
  return defineSystem((world: World) => {
    return world;
  });
}
