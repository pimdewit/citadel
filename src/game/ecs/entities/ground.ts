import {addComponent, addEntity, IWorld} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {Scale} from '../components/scale';

export function ground(world: IWorld) {
  const entity = addEntity(world);
  addComponent(world, Mesh, entity);
  Mesh.bufferInfo[entity] = GeometryIdentifier.PLANE;
  addComponent(world, Position, entity);
  addComponent(world, Scale, entity);
  Scale.x[entity] = 32;
  Scale.z[entity] = 32;

  return entity;
}
