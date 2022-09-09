import {addComponent, addEntity, IWorld} from 'bitecs';
import {Angle} from '../components/angle';
import {AngularVelocity} from '../components/angular-velocity';
import {ControlsMovement} from '../components/controls-movement';
import {InputKeyboard} from '../components/input-keyboard';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {PositionInterpolated} from '../components/position-interpolated';
import {Velocity} from '../components/velocity';

export function player(world: IWorld) {
  const entity = addEntity(world);
  addComponent(world, Mesh, entity);

  addComponent(world, Position, entity);
  Position.x[entity] = 20;
  addComponent(world, PositionInterpolated, entity);
  PositionInterpolated.alpha[entity] = 0.04;
  addComponent(world, Velocity, entity);
  Velocity.max[entity] = 0.15;

  addComponent(world, Angle, entity);
  addComponent(world, AngularVelocity, entity);
  AngularVelocity.x[entity] = Math.random() * 0.003;
  AngularVelocity.y[entity] = Math.random() * 0.003;

  addComponent(world, ControlsMovement, entity);
  addComponent(world, InputKeyboard, entity);

  return entity;
}
