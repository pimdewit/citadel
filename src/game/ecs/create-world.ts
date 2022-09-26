import {createWorld as createEcsWorld} from 'bitecs';
import {DirectionalLight, Scene, WebGLRenderer} from 'three';
import {createResources} from '../_resources';
import {resizeCamera} from '../lib/entity-hooks/resize-camera';
import {Keyboard} from '../lib/input/keyboard';
import {commonKeys} from '../lib/input/keyboard/common-keys';
import {World} from '../types';
import {Camera} from './components/camera/camera';
import {Group} from './components/group';
import {Position} from './components/position';
import {PositionInterpolationTarget} from './components/position-interpolation-target';
import {camera} from './entities/camera';
import {enemy} from './entities/enemy';
import {ground} from './entities/ground';
import {player} from './entities/player';
import {playerVisuals} from './entities/player-visuals';
import {skybox} from './entities/skybox';
import {tower} from './entities/tower';
import {towerVisuals} from './entities/tower-visuals';

export function createWorld(renderer: WebGLRenderer) {
  const world: World = createEcsWorld(
    {
      // Global data.
      viewport: new Int16Array(2),

      // Input.
      keyboard: new Keyboard(),

      // Graphics.
      resources: createResources(renderer),
      renderer,
      scene: new Scene(),
      meshes: new Map(), // TODO: remove.
      towerLines: new Map(),
      cameras: new Map(),
      groups: new Map(), // TODO: check if needed.
      sceneGraphNodes: new Map(),

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

  const c = camera(world);

  const backdrop = skybox(world);

  const playerContainer = player(world);
  Camera.parent[c] = playerContainer;

  const p = playerVisuals(world);
  Group.parent[p] = playerContainer;
  ground(world);

  const towerPositionX = new Array(2).fill(Math.random());
  for (let i = 0; i < towerPositionX.length; i++) {
    const container = tower(world);
    Position.x[container] = Math.random() * 30 - 15;
    Position.z[container] = Math.random() * 30 - 15;

    const visuals = towerVisuals(world);
    Group.parent[visuals] = container;
  }

  const xPositions = window.crypto.getRandomValues(new Int8Array(256));
  const zPositions = window.crypto.getRandomValues(new Int8Array(256));
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
