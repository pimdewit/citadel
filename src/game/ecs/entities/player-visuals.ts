import {addComponent, addEntity, IWorld} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {Mesh} from '../components/mesh';
import {SceneGraphNode} from '../components/tag/scene-graph-node';
import {Static} from '../components/tag/static';

export function playerVisuals(world: IWorld) {
  const entity = addEntity(world);

  addComponent(world, SceneGraphNode, entity);

  addComponent(world, Mesh, entity);
  Mesh.geometry[entity] = GeometryIdentifier.BOX;
  Mesh.program[entity] = ProgramIdentifier.PHONG;

  addComponent(world, Static, entity);

  return entity;
}
