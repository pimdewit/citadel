import {addComponent, addEntity, IWorld} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {Attack} from '../components/attack';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {Object3d} from '../components/tag/object-3d';
import {Vision} from '../components/vision';

export function tower(world: IWorld) {
  const entity = addEntity(world);

  addComponent(world, Object3d, entity);

  addComponent(world, Mesh, entity);
  Mesh.geometry[entity] = GeometryIdentifier.BOX;
  Mesh.program[entity] = ProgramIdentifier.UNLIT;

  addComponent(world, Position, entity);
  setVector3(Position, entity, 20, 0, 0.5);

  addComponent(world, Attack, entity);
  Attack.damage[entity] = 1;

  addComponent(world, Vision, entity);
  Vision.radius[entity] = 8;

  return entity;
}
