import {createWorld as createEcsWorld} from 'bitecs';
import {Position} from '../../ecs/components/position';
import {PositionInterpolationTarget} from '../../ecs/components/position-interpolation-target';
import {camera} from '../../ecs/entities/camera';
import {enemy} from '../../ecs/entities/enemy';
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

  const xPositions = window.crypto.getRandomValues(new Int8Array(10));
  const zPositions = window.crypto.getRandomValues(new Int8Array(10));

  for (let i = 0; i < xPositions.length; i++) {
    const e = enemy(world);
    PositionInterpolationTarget.alpha[e] = 0.01;
    PositionInterpolationTarget.x[e] = Math.random() * 16 - 8;
    PositionInterpolationTarget.z[e] = Math.random() * 16 - 8;
    Position.x[e] = xPositions[i];
    Position.z[e] = zPositions[i];
  }

  window.addEventListener('pointerdown', world.pointer.onPointerDown);
  window.addEventListener('pointermove', world.pointer.onPointerMove);
  window.addEventListener('pointerup', world.pointer.onPointerUp);

  return world;
}
