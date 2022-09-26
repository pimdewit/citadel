import {defineQuery, defineSystem} from 'bitecs';
import {Mesh as ThreeMesh, ShaderMaterial} from 'three';
import {World} from '../../types';
import {Mesh} from '../components/mesh';
import {MaterialTime} from '../components/tag/material-time';

export function shaderTimeSystem() {
  const entityQuery = defineQuery([Mesh, MaterialTime]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      const mesh = world.sceneGraphNodes.get(entity);
      if (!mesh) continue;

      const material = (mesh as ThreeMesh).material as ShaderMaterial;
      if (!material) continue;
      material.uniforms.u_time.value += MaterialTime.iterationAmount[entity];
    }

    return world;
  });
}
