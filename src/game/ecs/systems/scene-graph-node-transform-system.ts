import {defineQuery, defineSystem, hasComponent, Not} from 'bitecs';
import {World} from '../../types';
import {Angle} from '../components/angle';
import {Position} from '../components/position';
import {Scale} from '../components/scale';
import {SceneGraphNode} from '../components/tag/scene-graph-node';
import {Static} from '../components/tag/static';

export function sceneGraphNodeTransformSystem() {
  const entityQuery = defineQuery([SceneGraphNode, Not(Static)]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const mesh = world.sceneGraphNodes.get(entity);
      if (!mesh) continue;

      mesh.position.set(
        Position.x[entity],
        Position.y[entity],
        Position.z[entity]
      );

      if (hasComponent(world, Scale, entity)) {
        mesh.scale.set(Scale.x[entity], Scale.y[entity], Scale.z[entity]);
      }

      if (hasComponent(world, Angle, entity)) {
        mesh.rotation.set(Angle.x[entity], Angle.y[entity], Angle.z[entity]);
      }
    }

    return world;
  });
}
