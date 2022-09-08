import {addComponent, addEntity, createWorld, IWorld} from 'bitecs';
import {ControlsMovement} from '../../ecs/components/controls-movement';
import {InputKeyboard} from '../../ecs/components/input-keyboard';
import {Transform} from '../../ecs/components/transform';
import {TransformInterpolated} from '../../ecs/components/transform-interpolated';
import {TransformVelocity} from '../../ecs/components/transform-velocity';
import {VisualBox} from '../../ecs/components/visual-box';

export class Data {
  readonly world: IWorld;

  constructor() {
    this.world = createWorld();

    const player = addEntity(this.world);
    addComponent(this.world, Transform, player);
    addComponent(this.world, TransformInterpolated, player);
    addComponent(this.world, TransformVelocity, player);
    addComponent(this.world, VisualBox, player);
    addComponent(this.world, ControlsMovement, player);
    addComponent(this.world, InputKeyboard, player);
    TransformVelocity.rotationX[player] = 0.0015;
    TransformVelocity.rotationY[player] = 0.0015;
    Transform.scaleX[player] = 1;
    Transform.scaleY[player] = 1;
    Transform.scaleZ[player] = 1;
    TransformInterpolated.alpha[player] = 0.05;
  }
}
