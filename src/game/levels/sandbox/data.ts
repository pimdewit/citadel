import {createWorld, IWorld} from 'bitecs';
import {camera} from '../../ecs/entities/camera';
import {player} from '../../ecs/entities/player';

export class Data {
  readonly world: IWorld;

  constructor() {
    this.world = createWorld();
    const playerEntity = player(this.world);
    const cam = camera(this.world);
  }
}
