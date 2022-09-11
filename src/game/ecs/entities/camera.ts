import {addComponent, addEntity, IWorld} from 'bitecs';
import {setVector3Component} from '../../lib/math/vector3/set-vector3-component';
import {Angle} from '../components/angle';
import {Camera} from '../components/camera/camera';
import {CameraActive} from '../components/camera/camera-active';
import {CameraPerspective} from '../components/camera/camera-perspective';
import {CameraTarget} from '../components/camera/camera-target';
import {Position} from '../components/position';
import {PositionInterpolationTarget} from '../components/position-interpolation-target';
import {Velocity} from '../components/velocity';

export function camera(world: IWorld) {
  const entity = addEntity(world);
  addComponent(world, Camera, entity);
  addComponent(world, CameraActive, entity);
  addComponent(world, CameraTarget, entity);
  addComponent(world, CameraPerspective, entity);
  CameraPerspective.fov[entity] = 0.8;
  CameraPerspective.aspect[entity] = 2;
  CameraPerspective.near[entity] = 0.5;
  CameraPerspective.far[entity] = 100;

  addComponent(world, Angle, entity);
  addComponent(world, Position, entity);
  setVector3Component(Position, entity, 0, 50, 50);
  addComponent(world, PositionInterpolationTarget, entity);
  PositionInterpolationTarget.x[entity] = 10;
  PositionInterpolationTarget.y[entity] = 10;
  PositionInterpolationTarget.z[entity] = 20;
  PositionInterpolationTarget.alpha[entity] = 0.01;
  addComponent(world, Velocity, entity);
  Velocity.max[entity] = 0.15;

  return entity;
}
