import {addComponent, createWorld as createEcsWorld} from 'bitecs';
import {DirectionalLight, Scene, WebGLRenderer} from 'three';
import {resizeCamera} from '../lib/entity-hooks/resize-camera';
import {CameraNeedsUpdate} from './components/camera/camera-needs-update';
import {CameraPerspective} from './components/camera/camera-perspective';
import {Position} from './components/position';
import {PositionInterpolationTarget} from './components/position-interpolation-target';
import {camera} from './entities/camera';
import {enemy} from './entities/enemy';
import {ground} from './entities/ground';
import {player} from './entities/player';
import {tower} from './entities/tower';
import {Keyboard} from '../lib/input/keyboard';
import {commonKeys} from '../lib/input/keyboard/common-keys';
import {World} from '../types';

export function createWorld(renderer: WebGLRenderer) {
  const world: World = createEcsWorld();

  // Global data.
  world.viewport = new Int16Array(2);

  // Input.
  world.keyboard = new Keyboard();
  world.keyboard.addKeys(commonKeys);

  // Graphics.
  world.renderer = renderer;
  world.scene = new Scene();
  world.meshes = new Map();
  world.cameras = new Map();

  // Events.
  world.resize = (width: number, height: number, dpr: number) => {
    world.renderer.setSize(width, height);
    world.renderer.setPixelRatio(dpr);
    world.viewport[0] = Math.round(width);
    world.viewport[1] = Math.round(height);
    resizeCamera(world, width / height, true);
  };

  const a = new DirectionalLight();
  a.position.set(-10, 100, 30);
  world.scene.add(a);

  camera(world);
  player(world);
  ground(world);

  const positions = [2, 4, 6, 8, 10];

  for (let i = 0; i < positions.length; i++) {
    const e = enemy(world);
    Position.x[e] = positions[i];
    PositionInterpolationTarget.alpha[e] = 0.01;
  }

  const towerPositionX = window.crypto.getRandomValues(new Int8Array(2));
  const towerPositionY = window.crypto.getRandomValues(new Int8Array(2));
  for (let i = 0; i < towerPositionX.length; i++) {
    const e = tower(world);
    Position.x[e] = towerPositionX[i] / 20;
    Position.z[e] = towerPositionY[i] / 20;
  }

  const xPositions = window.crypto.getRandomValues(new Int8Array(128));
  const zPositions = window.crypto.getRandomValues(new Int8Array(128));
  for (let i = 0; i < xPositions.length; i++) {
    const e = enemy(world);
    PositionInterpolationTarget.alpha[e] = 0.01;
    PositionInterpolationTarget.x[e] = Math.random() * 16 - 8;
    PositionInterpolationTarget.z[e] = Math.random() * 16 - 8;
    Position.x[e] = xPositions[i];
    Position.z[e] = zPositions[i];
  }

  return world;
}
