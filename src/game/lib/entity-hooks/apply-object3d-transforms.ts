import {hasComponent} from 'bitecs';
import {Object3D} from 'three';
import {Angle} from '../../ecs/components/angle';
import {Position} from '../../ecs/components/position';
import {Scale} from '../../ecs/components/scale';
import {Static} from '../../ecs/components/tag/static';
import {World} from '../../types';

export function applyObject3dTransforms(
  world: World,
  mesh: Object3D,
  entity: number
) {
  if (hasComponent(world, Position, entity)) {
    mesh.position.set(
      Position.x[entity],
      Position.y[entity],
      Position.z[entity]
    );
  }

  if (hasComponent(world, Angle, entity)) {
    mesh.rotation.set(Angle.x[entity], Angle.y[entity], Angle.z[entity]);
  }

  if (hasComponent(world, Scale, entity)) {
    mesh.scale.set(Scale.x[entity], Scale.y[entity], Scale.z[entity]);
  }

  // If the mesh has the capability to move, mark the mesh as dynamic.
  if (hasComponent(world, Static, entity)) {
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
  }
}
