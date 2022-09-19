import {addComponent, addEntity, IWorld} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {Mesh} from '../components/mesh';
import {Object3d} from '../components/tag/object-3d';
import {Static} from '../components/tag/static';

export function playerVisuals(world: IWorld) {
  const entity = addEntity(world);

  addComponent(world, Object3d, entity);

  addComponent(world, Mesh, entity);
  Mesh.geometry[entity] = GeometryIdentifier.BOX;
  Mesh.program[entity] = ProgramIdentifier.PHONG;

  addComponent(world, Static, entity);

  return entity;
}
