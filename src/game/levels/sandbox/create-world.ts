import {createWorld as createEcsWorld} from 'bitecs';
import {camera} from '../../ecs/entities/camera';
import {ground} from '../../ecs/entities/ground';
import {player} from '../../ecs/entities/player';
import {Keyboard} from '../../lib/input/keyboard';
import {commonKeys} from '../../lib/input/keyboard/common-keys';
import {DragPointer} from '../../lib/input/pointer/drag-pointer';
import {World} from '../../types';

export function createWorld(gl: WebGLRenderingContext) {
  const world: World = createEcsWorld();
  world.gl = gl;
  world.keyboard = new Keyboard();
  world.keyboard.addKeys(commonKeys);
  world.pointer = new DragPointer();
  world.meshes = new Map();
  world.cameras = new Map();

  camera(world);
  player(world);
  ground(world);

  window.addEventListener('pointerdown', world.pointer.onPointerDown);
  window.addEventListener('pointermove', world.pointer.onPointerMove);
  window.addEventListener('pointerup', world.pointer.onPointerUp);

  return world;
}
