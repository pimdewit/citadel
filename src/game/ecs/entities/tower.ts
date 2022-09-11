import {addComponent, addEntity, IWorld} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {setVector3Component} from '../../lib/math/vector3/set-vector3-component';
import {Attack} from '../components/attack';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {Vision} from '../components/vision';

export function tower(world: IWorld) {
  const entity = addEntity(world);
  addComponent(world, Mesh, entity);
  Mesh.bufferInfo[entity] = GeometryIdentifier.BOX;
  Mesh.program[entity] = ProgramIdentifier.UNLIT;

  addComponent(world, Position, entity);
  setVector3Component(Position, entity, 20, 0, 0.5);

  addComponent(world, Attack, entity);
  Attack.damage[entity] = 1;

  addComponent(world, Vision, entity);
  Vision.radius[entity] = 8;

  return entity;
}
