import {defineQuery, defineSystem} from 'bitecs';
import {World} from '../../types';
import {Angle} from '../components/angle';
import {AngularVelocity} from '../components/angular-velocity';

export function angleSystem() {
  const entityQuery = defineQuery([Angle, AngularVelocity]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);

    for (let i = 0; i < entities.length; ++i) {
      const id = entities[i];
      Angle.x[id] += AngularVelocity.x[id];
      Angle.y[id] += AngularVelocity.y[id];
      Angle.z[id] += AngularVelocity.z[id];
    }

    return world;
  });
}
