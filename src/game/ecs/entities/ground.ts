import {addComponent, addEntity, IWorld} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {Scale} from '../components/scale';
import {Static} from '../components/tag/static';

export function ground(world: IWorld) {
  const entity = addEntity(world);
  addComponent(world, Mesh, entity);
  Mesh.geometry[entity] = GeometryIdentifier.PLANE;

  addComponent(world, Static, entity);

  addComponent(world, Position, entity);
  Position.y[entity] = -0.01;

  addComponent(world, Scale, entity);
  Scale.x[entity] = 32;
  Scale.z[entity] = 32;

  return entity;
}
