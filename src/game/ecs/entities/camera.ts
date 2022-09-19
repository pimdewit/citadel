import {addComponent, addEntity, IWorld} from 'bitecs';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {Angle} from '../components/angle';
import {Camera} from '../components/camera/camera';
import {CameraActive} from '../components/camera/camera-active';
import {CameraOrbitControls} from '../components/camera/camera-orbit-controls';
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
  addComponent(world, CameraOrbitControls, entity);
  CameraOrbitControls.minPolarAngle[entity] = Math.PI / 8;
  CameraOrbitControls.maxPolarAngle[entity] = Math.PI / 2.5;
  CameraOrbitControls.dampingFactor[entity] = 0.06;
  CameraOrbitControls.minDistance[entity] = 10;
  CameraOrbitControls.maxDistance[entity] = 40;
  addComponent(world, CameraPerspective, entity);
  CameraPerspective.fov[entity] = 50;
  CameraPerspective.aspect[entity] = 2;
  CameraPerspective.near[entity] = 0.5;
  CameraPerspective.far[entity] = 320;

  addComponent(world, Angle, entity);
  addComponent(world, Position, entity);
  setVector3(Position, entity, 10, 50, 50);
  addComponent(world, PositionInterpolationTarget, entity);
  PositionInterpolationTarget.x[entity] = 0;
  PositionInterpolationTarget.y[entity] = 10;
  PositionInterpolationTarget.z[entity] = 20;
  PositionInterpolationTarget.alpha[entity] = 0.01;
  addComponent(world, Velocity, entity);
  Velocity.max[entity] = 0.15;

  return entity;
}
