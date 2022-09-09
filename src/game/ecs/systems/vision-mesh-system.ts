import {
  defineQuery,
  defineSystem,
  enterQuery,
  exitQuery,
  removeEntity,
} from 'bitecs';
import {World} from '../../types';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {Scale} from '../components/scale';
import {Velocity} from '../components/velocity';
import {Vision} from '../components/vision';
import {visionRadius} from '../entities/vision-radius';

export function visionMeshSystem() {
  const entityQuery = defineQuery([Vision, Mesh]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);
    const entitiesEntered = entityQueryEnter(world);
    const entitiesExited = entityQueryExit(world);

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const id = entitiesEntered[i];

      const radiusEntity = visionRadius(world);
      Scale.x[radiusEntity] = Vision.distance[id];
      Scale.y[radiusEntity] = Vision.distance[id];
      Scale.z[radiusEntity] = Vision.distance[id];
      Vision.meshEntityId[id] = radiusEntity;
    }

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      const radiusEntity = Vision.meshEntityId[id];
      Position.x[radiusEntity] = Position.x[id];
      Position.y[radiusEntity] = Position.y[id];
      Position.z[radiusEntity] = Position.z[id];
    }

    for (let i = 0; i < entitiesExited.length; ++i) {
      const id = entitiesExited[i];
      removeEntity(world, Vision.meshEntityId[id]);
    }

    return world;
  });
}
