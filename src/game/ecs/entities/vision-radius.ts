import {addComponent, addEntity} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {World} from '../../types';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {Scale} from '../components/scale';

export function visionRadius(world: World) {
  const entity = addEntity(world);
  addComponent(world, Mesh, entity);
  Mesh.geometry[entity] = GeometryIdentifier.DISC;
  Mesh.program[entity] = ProgramIdentifier.UNLIT;

  addComponent(world, Position, entity);
  addComponent(world, Scale, entity);
  setVector3(Scale, entity, 1, 1, 1);

  return entity;
}
