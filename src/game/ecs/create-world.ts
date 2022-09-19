import {addComponent, addEntity, createWorld as createEcsWorld} from 'bitecs';
import {AxesHelper, DirectionalLight, Scene, WebGLRenderer} from 'three';
import {createResources} from '../_resources';
import {resizeCamera} from '../lib/entity-hooks/resize-camera';
import {Camera} from './components/camera/camera';
import {Mesh} from './components/mesh';
import {Group} from './components/group';
import {Position} from './components/position';
import {PositionInterpolationTarget} from './components/position-interpolation-target';
import {camera} from './entities/camera';
import {enemy} from './entities/enemy';
import {ground} from './entities/ground';
import {groupPlayer} from './entities/group-player';
import {player} from './entities/player';
import {tower} from './entities/tower';
import {Keyboard} from '../lib/input/keyboard';
import {commonKeys} from '../lib/input/keyboard/common-keys';
import {World} from '../types';

export function createWorld(renderer: WebGLRenderer) {
  const world: World = createEcsWorld(
    {
      // Global data.
      viewport: new Int16Array(2),

      // Input.
      keyboard: new Keyboard(),

      // Graphics.
      resources: createResources(),
      renderer,
      scene: new Scene(),
      meshes: new Map(),
      cameras: new Map(),
      groups: new Map(),

      // Events.
      resize: (width: number, height: number, dpr: number) => {
        world.renderer.setSize(width, height);
        world.renderer.setPixelRatio(dpr);
        world.viewport[0] = Math.round(width);
        world.viewport[1] = Math.round(height);
        resizeCamera(world, width / height, true);
      },
    },
    1024
  );
  world.keyboard.addKeys(commonKeys);

  const light = new DirectionalLight();
  light.position.set(-10, 100, 30);
  world.scene.add(light);
  world.scene.add(new AxesHelper(32));

  const c = camera(world);

  const playerContainer = groupPlayer(world);
  Camera.parent[c] = playerContainer;

  const p = player(world);
  Mesh.parent[p] = playerContainer;
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
    Position.x[e] = xPositions[i] * 100;
    Position.z[e] = zPositions[i] * 100;
  }

  return world;
}
