import {addComponent, addEntity, createWorld, IWorld} from 'bitecs';
import {Angle} from '../../ecs/components/angle';
import {ControlsMovement} from '../../ecs/components/controls-movement';
import {InputKeyboard} from '../../ecs/components/input-keyboard';
import {Position} from '../../ecs/components/position';
import {Velocity} from '../../ecs/components/velocity';
import {AngularVelocity} from '../../ecs/components/angular-velocity';
import {VisualBox} from '../../ecs/components/visual-box';

export class Data {
  readonly world: IWorld;

  constructor() {
    this.world = createWorld();

    const player = addEntity(this.world);
    addComponent(this.world, VisualBox, player);

    addComponent(this.world, Position, player);
    addComponent(this.world, Velocity, player);

    addComponent(this.world, Angle, player);
    addComponent(this.world, AngularVelocity, player);

    addComponent(this.world, ControlsMovement, player);
    addComponent(this.world, InputKeyboard, player);
    Position.x[player] = 1;
    Velocity.max[player] = 0.15;
    AngularVelocity.x[player] = 0.0015;
    AngularVelocity.y[player] = 0.0015;
  }
}
