import {Vector3, Vector3Component} from './typings';

export function copy(targetVector: Vector3, vectorToCopy: Vector3) {
  targetVector[0] = vectorToCopy[0];
  targetVector[1] = vectorToCopy[1];
  targetVector[2] = vectorToCopy[2];

  return targetVector;
}

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
