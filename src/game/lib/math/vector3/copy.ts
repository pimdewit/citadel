import {Vector3Component} from './typings';

export function copyComponent(
  targetComponent: Vector3Component,
  targetEntity: number,
  componentToCopy: Vector3Component,
  entityToCopy: number
) {
  targetComponent.x[targetEntity] = componentToCopy.x[entityToCopy];
  targetComponent.y[targetEntity] = componentToCopy.y[entityToCopy];
  targetComponent.z[targetEntity] = componentToCopy.z[entityToCopy];

  return targetComponent;
}
