import {addComponent, addEntity, createWorld, IWorld} from 'bitecs';
import {Angle} from '../../ecs/components/angle';
import {AngularVelocity} from '../../ecs/components/angular-velocity';
import {ControlsMovement} from '../../ecs/components/controls-movement';
import {InputKeyboard} from '../../ecs/components/input-keyboard';
import {Position} from '../../ecs/components/position';
import {PositionInterpolated} from '../../ecs/components/position-interpolated';
import {Velocity} from '../../ecs/components/velocity';
import {VisualBox} from '../../ecs/components/visual-box';

export class Data {
  readonly world: IWorld;

  constructor() {
    this.world = createWorld();

    const player = addEntity(this.world);
    addComponent(this.world, VisualBox, player);

    addComponent(this.world, Position, player);
    Position.x[player] = 20;
    addComponent(this.world, PositionInterpolated, player);
    PositionInterpolated.alpha[player] = 0.04;
    addComponent(this.world, Velocity, player);
    Velocity.max[player] = 0.15;

    addComponent(this.world, Angle, player);
    addComponent(this.world, AngularVelocity, player);
    AngularVelocity.x[player] = Math.random() * 0.003;
    AngularVelocity.y[player] = Math.random() * 0.003;

    addComponent(this.world, ControlsMovement, player);
    addComponent(this.world, InputKeyboard, player);
  }
}
