import {createWorld as createEcsWorld} from 'bitecs';
import {camera} from '../../ecs/entities/camera';
import {player} from '../../ecs/entities/player';
import {Keyboard} from '../../lib/input/keyboard';
import {commonKeys} from '../../lib/input/keyboard/common-keys';
import {World} from '../../types';

export function createWorld(gl: WebGLRenderingContext) {
  const world: World = createEcsWorld();
  world.meshes = new Map();
  world.cameras = new Map();
  world.keyboard = new Keyboard();
  world.keyboard.addKeys(commonKeys);
  world.gl = gl;

  player(world);
  camera(world);

  return world;
}
