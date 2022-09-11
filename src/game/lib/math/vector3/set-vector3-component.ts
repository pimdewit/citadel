import {Vector3Component} from './typings';

export function setVector3Component(
  component: Vector3Component,
  eid: number,
  x: number,
  y: number,
  z: number
) {
  component.x[eid] = x;
  component.y[eid] = y;
  component.z[eid] = z;

  return component;
}
