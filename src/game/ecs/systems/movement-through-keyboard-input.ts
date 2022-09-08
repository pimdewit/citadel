import {defineQuery, defineSystem} from 'bitecs';
import {Keyboard} from '../../lib/input/keyboard';
import {Key} from '../../lib/input/keyboard/key';
import {KeyValues} from '../../lib/input/keyboard/keys';
import {World} from '../../types';
import {ControlsMovement} from '../components/controls-movement';
import {InputKeyboard} from '../components/input-keyboard';
import {Position} from '../components/position';
import {Velocity} from '../components/velocity';

function handleKeyboard(key: Key, entityId: number) {
  if (key) {
    switch (key.value) {
      case KeyValues.ArrowUp:
      case KeyValues.W:
        Velocity.x[entityId] = 0;
        Velocity.z[entityId] = -Velocity.max[entityId];
        break;
      case KeyValues.ArrowLeft:
      case KeyValues.A:
        Velocity.x[entityId] = -Velocity.max[entityId];
        Velocity.z[entityId] = 0;
        break;
      case KeyValues.ArrowDown:
      case KeyValues.S:
        Velocity.x[entityId] = 0;
        Velocity.z[entityId] = Velocity.max[entityId];
        break;
      case KeyValues.ArrowRight:
      case KeyValues.D:
        Velocity.x[entityId] = Velocity.max[entityId];
        Velocity.z[entityId] = 0;
        break;
    }
  } else {
    Velocity.x[entityId] = 0;
    Velocity.z[entityId] = 0;
  }
}

export function movementThroughKeyboardSystem(keyboard: Keyboard) {
  const entityQuery = defineQuery([
    Position,
    Velocity,
    InputKeyboard,
    ControlsMovement,
  ]);

  return defineSystem((world: World) => {
    const key = keyboard.lastKeyPressed;
    const entities = entityQuery(world);
    // const spaceBarDown =
    // keyboard.allKeysPressed.includes(commonKeys[CommonKeys.SpaceKey]);

    for (let i = 0; i < entities.length; ++i) {
      handleKeyboard(key, entities[i]);
    }

    return world;
  });
}
