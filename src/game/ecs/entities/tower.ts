import {addComponent, addEntity, IWorld} from 'bitecs';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {Attack} from '../components/attack';
import {Group} from '../components/group';
import {Position} from '../components/position';
import {SceneGraphNode} from '../components/tag/scene-graph-node';
import {Static} from '../components/tag/static';
import {Vision} from '../components/vision';

export function tower(world: IWorld) {
  const entity = addEntity(world);

  addComponent(world, Group, entity);

  addComponent(world, SceneGraphNode, entity);

  addComponent(world, Position, entity);
  setVector3(Position, entity, 20, 0, 0.5);

  addComponent(world, Attack, entity);
  Attack.damage[entity] = 1;

  addComponent(world, Vision, entity);
  Vision.radius[entity] = 8;

  addComponent(world, Static, entity);

  return entity;
}
