import {Vector3Component} from './typings';

export function setVector3(
  component: Vector3Component,
  entity: number,
  x: number,
  y: number,
  z: number
) {
  component.x[entity] = x;
  component.y[entity] = y;
  component.z[entity] = z;

  return component;
}
