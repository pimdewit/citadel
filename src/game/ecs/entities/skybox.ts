import {addComponent, addEntity} from 'bitecs';
import {GeometryIdentifier} from '../../_resources/geometry';
import {ProgramIdentifier} from '../../_resources/programs';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {World} from '../../types';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {Scale} from '../components/scale';
import {Object3d} from '../components/tag/object-3d';
import {Static} from '../components/tag/static';

export function skybox(world: World) {
  const entity = addEntity(world);
  const SCALE = 128;

  addComponent(world, Object3d, entity);

  addComponent(world, Mesh, entity);
  Mesh.geometry[entity] = GeometryIdentifier.SPHERE;
  Mesh.program[entity] = ProgramIdentifier.GRADIENT;

  addComponent(world, Position, entity);

  addComponent(world, Scale, entity);
  setVector3(Scale, entity, SCALE, SCALE, SCALE);

  addComponent(world, Static, entity);

  return entity;
}
