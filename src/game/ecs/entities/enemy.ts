import {addComponent, addEntity, IWorld} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {Angle} from '../components/angle';
import {AngularVelocity} from '../components/angular-velocity';
import {Health} from '../components/health';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {PositionInterpolationTarget} from '../components/position-interpolation-target';
import {Scale} from '../components/scale';
import {Enemy} from '../components/tag/enemy';
import {SceneGraphNode} from '../components/tag/scene-graph-node';
import {Perceivable} from '../components/tag/perceivable';
import {Velocity} from '../components/velocity';

export function enemy(world: IWorld) {
  const entity = addEntity(world);

  addComponent(world, Enemy, entity);

  addComponent(world, SceneGraphNode, entity);

  addComponent(world, Mesh, entity);
  Mesh.geometry[entity] = GeometryIdentifier.SPHERE;
  Mesh.program[entity] = ProgramIdentifier.UNLIT;

  addComponent(world, Position, entity);

  addComponent(world, PositionInterpolationTarget, entity);
  PositionInterpolationTarget.y[entity] = 0.5;
  PositionInterpolationTarget.alpha[entity] = 0.01;

  addComponent(world, Velocity, entity);
  Velocity.max[entity] = 0.15;

  addComponent(world, Scale, entity);
  setVector3(Scale, entity, 1, 1, 1);

  addComponent(world, Angle, entity);

  addComponent(world, AngularVelocity, entity);
  AngularVelocity.y[entity] = 0.003;

  addComponent(world, Perceivable, entity);

  addComponent(world, Health, entity);
  Health.total[entity] = 100;
  Health.current[entity] = 100;

  return entity;
}
