import {addComponent, addEntity, IWorld} from 'bitecs';
import {Camera} from '../components/camera';
import {CameraActive} from '../components/camera-active';
import {CameraPerspective} from '../components/camera-perspective';
import {Position} from '../components/position';
import {PositionInterpolated} from '../components/position-interpolated';
import {Velocity} from '../components/velocity';

export function camera(world: IWorld) {
  const entity = addEntity(world);
  addComponent(world, Camera, entity);
  addComponent(world, CameraActive, entity);
  addComponent(world, CameraPerspective, entity);
  CameraPerspective.fov[entity] = 0.5235987755982988;
  CameraPerspective.aspect[entity] = 2;
  CameraPerspective.near[entity] = 0.5;
  CameraPerspective.far[entity] = 100;

  addComponent(world, Position, entity);
  Position.x[entity] = 0;
  Position.y[entity] = 10;
  Position.z[entity] = 20;
  addComponent(world, PositionInterpolated, entity);
  PositionInterpolated.x[entity] = 0;
  PositionInterpolated.y[entity] = 10;
  PositionInterpolated.z[entity] = 20;
  PositionInterpolated.alpha[entity] = 0.04;
  addComponent(world, Velocity, entity);
  Velocity.max[entity] = 0.15;

  return entity;
}
