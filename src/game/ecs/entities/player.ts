import {addComponent, addEntity, IWorld} from 'bitecs';
import {Attack} from '../components/attack';
import {Group} from '../components/group';
import {Position} from '../components/position';
import {PositionInterpolationTarget} from '../components/position-interpolation-target';
import {ControlsMovement} from '../components/tag/controls-movement';
import {InputKeyboard} from '../components/tag/input-keyboard';
import {Object3d} from '../components/tag/object-3d';
import {Velocity} from '../components/velocity';
import {Vision} from '../components/vision';

export function player(world: IWorld) {
  const entity = addEntity(world);

  addComponent(world, Group, entity);

  addComponent(world, Object3d, entity);

  addComponent(world, Position, entity);
  Position.x[entity] = 0;
  Position.y[entity] = 0;

  addComponent(world, PositionInterpolationTarget, entity);
  PositionInterpolationTarget.alpha[entity] = 0.15;

  addComponent(world, Velocity, entity);
  Velocity.max[entity] = 0.15;

  addComponent(world, ControlsMovement, entity);
  addComponent(world, InputKeyboard, entity);

  addComponent(world, Attack, entity);
  Attack.damage[entity] = 20;

  addComponent(world, Vision, entity);
  Vision.radius[entity] = 5;

  return entity;
}
