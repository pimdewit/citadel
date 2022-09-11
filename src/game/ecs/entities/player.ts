import {addComponent, addEntity, IWorld} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {Attack} from '../components/attack';
import {ControlsMovement} from '../components/tag/controls-movement';
import {InputKeyboard} from '../components/tag/input-keyboard';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {PositionInterpolationTarget} from '../components/position-interpolation-target';
import {Velocity} from '../components/velocity';
import {Vision} from '../components/vision';

export function player(world: IWorld) {
  const entity = addEntity(world);
  addComponent(world, Mesh, entity);
  Mesh.bufferInfo[entity] = GeometryIdentifier.BOX;
  Mesh.program[entity] = ProgramIdentifier.PHONG;

  addComponent(world, Position, entity);
  Position.x[entity] = 20;
  addComponent(world, PositionInterpolationTarget, entity);
  PositionInterpolationTarget.y[entity] = 0.5;
  PositionInterpolationTarget.alpha[entity] = 0.1;
  addComponent(world, Velocity, entity);
  Velocity.max[entity] = 0.15;

  addComponent(world, ControlsMovement, entity);
  addComponent(world, InputKeyboard, entity);

  addComponent(world, Attack, entity);
  Attack.damage[entity] = 5;

  addComponent(world, Vision, entity);
  Vision.radius[entity] = 3;

  return entity;
}
