import {addComponent, addEntity, IWorld} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {Angle} from '../components/angle';
import {AngularVelocity} from '../components/angular-velocity';
import {ControlsMovement} from '../components/controls-movement';
import {InputKeyboard} from '../components/input-keyboard';
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
  PositionInterpolationTarget.alpha[entity] = 0.04;
  addComponent(world, Velocity, entity);
  Velocity.max[entity] = 0.15;

  addComponent(world, Angle, entity);
  addComponent(world, AngularVelocity, entity);
  AngularVelocity.y[entity] = Math.random() * 0.003;

  addComponent(world, ControlsMovement, entity);
  addComponent(world, InputKeyboard, entity);

  addComponent(world, Vision, entity);
  Vision.distance[entity] = 5;

  return entity;
}
