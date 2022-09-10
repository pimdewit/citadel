import {createWorld as createEcsWorld} from 'bitecs';
import {CameraArcRotate} from '../../ecs/components/camera/camera-arc-rotate';
import {camera} from '../../ecs/entities/camera';
import {ground} from '../../ecs/entities/ground';
import {player} from '../../ecs/entities/player';
import {Keyboard} from '../../lib/input/keyboard';
import {commonKeys} from '../../lib/input/keyboard/common-keys';
import {Pointer} from '../../lib/input/pointer';
import {World} from '../../types';

export function createWorld(gl: WebGLRenderingContext) {
  const world: World = createEcsWorld();
  world.gl = gl;
  world.keyboard = new Keyboard();
  world.keyboard.addKeys(commonKeys);
  world.pointer = new Pointer();
  world.meshes = new Map();
  world.cameras = new Map();

  const c = camera(world);
  player(world);
  ground(world);

  function onPointerMove(event: PointerEvent) {
    world.pointer.onPointerMove(event);
    CameraArcRotate.angle[c] = 90 + world.pointer.x * 360;
  }

  window.addEventListener('pointermove', onPointerMove);

  return world;
}
