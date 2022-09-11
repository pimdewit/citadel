import {
  defineQuery,
  defineSystem,
  enterQuery,
  exitQuery,
  removeEntity,
} from 'bitecs';
import {copyComponent} from '../../lib/math/vector3/copy';
import {setVector3Component} from '../../lib/math/vector3/set-vector3-component';
import {World} from '../../types';
import {Mesh} from '../components/mesh';
import {Position} from '../components/position';
import {Scale} from '../components/scale';
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
      const entity = entitiesEntered[i];

      const radiusEntity = visionRadius(world);
      const distance = Vision.radius[entity];
      setVector3Component(Scale, radiusEntity, distance, distance, distance);
      Vision.meshEntityId[entity] = radiusEntity;
    }

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const radiusEntity = Vision.meshEntityId[entity];
      copyComponent(Position, radiusEntity, Position, entity);
    }

    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      removeEntity(world, Vision.meshEntityId[entity]);
    }

    return world;
  });
}
