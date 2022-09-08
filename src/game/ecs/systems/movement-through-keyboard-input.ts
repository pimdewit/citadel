import {defineQuery, defineSystem} from 'bitecs';
import {Keyboard} from '../../lib/input/keyboard';
import {Key} from '../../lib/input/keyboard/key';
import {KeyValues} from '../../lib/input/keyboard/keys';
import {ControlsMovement} from '../components/controls-movement';
import {InputKeyboard} from '../components/input-keyboard';
import {Transform} from '../components/transform';
import {TransformVelocity} from '../components/transform-velocity';

const min = 0;
const max = 0.15;

function handleKeyboard(key: Key, entityId: number) {
  if (key) {
    switch (key.value) {
      case KeyValues.ArrowUp:
      case KeyValues.W:
        TransformVelocity.positionX[entityId] = min;
        TransformVelocity.positionZ[entityId] = -max;
        break;
      case KeyValues.ArrowLeft:
      case KeyValues.A:
        TransformVelocity.positionX[entityId] = -max;
        TransformVelocity.positionZ[entityId] = min;
        break;
      case KeyValues.ArrowDown:
      case KeyValues.S:
        TransformVelocity.positionX[entityId] = min;
        TransformVelocity.positionZ[entityId] = max;
        break;
      case KeyValues.ArrowRight:
      case KeyValues.D:
        TransformVelocity.positionX[entityId] = max;
        TransformVelocity.positionZ[entityId] = min;
        break;
    }
  } else {
    TransformVelocity.positionX[entityId] = min;
    TransformVelocity.positionZ[entityId] = min;
  }
}

/**
 * Apply transform velocities to the transform.
 */
export function movementThroughKeyboardSystem(keyboard: Keyboard) {
  const entityQuery = defineQuery([
    Transform,
    TransformVelocity,
    InputKeyboard,
    ControlsMovement,
  ]);

  return defineSystem(world => {
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
