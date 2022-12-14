import {
  defineQuery,
  defineSystem,
  enterQuery,
  exitQuery,
  removeEntity,
} from 'bitecs';
import {setVector3} from '../../lib/math/vector3/set-vector3';
import {World} from '../../types';
import {Group} from '../components/group';
import {Scale} from '../components/scale';
import {Vision} from '../components/vision';
import {visionRadius} from '../entities/vision-radius';

export function visionMeshSystem() {
  const entityQuery = defineQuery([Vision, Group]);
  const entityQueryEnter = enterQuery(entityQuery);
  const entityQueryExit = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entitiesEntered = entityQueryEnter(world);
    const entitiesExited = entityQueryExit(world);

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];
      const radiusEntity = visionRadius(world);
      const distance = Vision.radius[entity];
      setVector3(Scale, radiusEntity, distance, distance, distance);
      Group.parent[radiusEntity] = entity;
      Vision.associatedMeshEntity[entity] = radiusEntity;
    }

    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      removeEntity(world, Vision.associatedMeshEntity[entity]);
    }

    return world;
  });
}
