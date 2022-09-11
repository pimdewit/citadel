import {defineQuery, defineSystem} from 'bitecs';
import {World} from '../../types';
import {Angle} from '../components/angle';
import {AngularVelocity} from '../components/angular-velocity';

export function angleSystem() {
  const entityQuery = defineQuery([Angle, AngularVelocity]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      Angle.x[entity] += AngularVelocity.x[entity];
      Angle.y[entity] += AngularVelocity.y[entity];
      Angle.z[entity] += AngularVelocity.z[entity];
    }

    return world;
  });
}
