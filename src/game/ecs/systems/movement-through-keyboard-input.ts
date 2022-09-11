import {defineQuery, defineSystem} from 'bitecs';
import {getDirection} from '../../lib/input/keyboard/get-analog-direction';
import {World} from '../../types';
import {ControlsMovement} from '../components/tag/controls-movement';
import {InputKeyboard} from '../components/tag/input-keyboard';
import {Position} from '../components/position';
import {Velocity} from '../components/velocity';

export function movementThroughKeyboardSystem() {
  const entityQuery = defineQuery([
    Position,
    Velocity,
    InputKeyboard,
    ControlsMovement,
  ]);

  return defineSystem((world: World) => {
    const entities = entityQuery(world);
    const {x, y} = getDirection(world.keyboard);

    for (let i = 0; i < entities.length; ++i) {
      const entity = entities[i];
      Velocity.x[entity] = Velocity.max[entity] * x;
      Velocity.z[entity] = Velocity.max[entity] * y;
    }

    return world;
  });
}
