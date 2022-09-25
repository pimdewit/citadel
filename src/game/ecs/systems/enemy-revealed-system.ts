import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {Mesh} from 'three';
import {ColorIdentifier} from '../../_resources/colors';
import {World} from '../../types';
import {Enemy} from '../components/tag/enemy';
import {Revealed} from '../components/tag/revealed';

export function enemyRevealedSystem() {
  const entityQuery = defineQuery([Enemy, Revealed]);
  const entityEnteredQuery = enterQuery(entityQuery);
  const entityExitedQuery = exitQuery(entityQuery);

  return defineSystem((world: World) => {
    const entitiesEntered = entityEnteredQuery(world);
    const entitiesExited = entityExitedQuery(world);

    for (let i = 0; i < entitiesEntered.length; ++i) {
      const entity = entitiesEntered[i];
      if (world.sceneGraphNodes.has(entity)) {
        const enemyMesh = world.sceneGraphNodes.get(entity) as Mesh;
        // @ts-ignore
        enemyMesh.material.uniforms.u_color.value = world.resources.colors(
          ColorIdentifier.GREEN
        );
      }
    }

    for (let i = 0; i < entitiesExited.length; ++i) {
      const entity = entitiesExited[i];
      if (world.sceneGraphNodes.has(entity)) {
        const enemyMesh = world.sceneGraphNodes.get(entity) as Mesh;
        // @ts-ignore
        enemyMesh.material.uniforms.u_color.value = world.resources.colors(
          ColorIdentifier.BLUE
        );
      }
    }

    return world;
  });
}
