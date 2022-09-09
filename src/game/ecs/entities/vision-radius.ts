import {addComponent, addEntity} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {World} from '../../types';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {Scale} from '../components/scale';

export function visionRadius(world: World) {
  const entity = addEntity(world);
  addComponent(world, Mesh, entity);
  Mesh.bufferInfo[entity] = GeometryIdentifier.DISC;
  Mesh.program[entity] = ProgramIdentifier.UNLIT;

  addComponent(world, Position, entity);
  addComponent(world, Scale, entity);
  Scale.x[entity] = 1;
  Scale.y[entity] = 1;
  Scale.z[entity] = 1;

  return entity;
}
