import {createWorld} from 'bitecs';
import {CameraPerspective} from '../../ecs/components/camera-perspective';
import {camera} from '../../ecs/entities/camera';
import {player} from '../../ecs/entities/player';
import {World} from '../../types';

export class Data {
  readonly world: World;

  constructor() {
    this.world = createWorld();
    this.world.meshes = new Map();
    this.world.cameras = new Map();

    const playerEntity = player(this.world);
    const cam = camera(this.world);
  }
}
