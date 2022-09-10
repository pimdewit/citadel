import {createWorld as createEcsWorld} from 'bitecs';
import {CameraArcRotate} from '../../ecs/components/camera/camera-arc-rotate';
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

  const c = camera(world);
  player(world);
  ground(world);

  function onPointerMove(event: PointerEvent) {
    const coords = world.pointer.onPointerMove(event);
    if (!coords) return;

    CameraArcRotate.angle[c] = 90 + coords[0] * 360;
  }

  const onPointerDown = world.pointer.onPointerDown;
  const onPointerUp = world.pointer.onPointerUp;

  window.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  return world;
}
