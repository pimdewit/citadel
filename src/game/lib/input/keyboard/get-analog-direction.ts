import {Keyboard} from './index';
import {KeyValues} from './keys';

export function getDirection(keyboard: Keyboard) {
  let x = 0;
  let y = 0;

  if (
    keyboard.allKeysPressed.find(key => key.value === KeyValues.W) ||
    keyboard.allKeysPressed.find(key => key.value === KeyValues.ArrowUp)
  ) {
    y = -1;
  } else if (
    keyboard.allKeysPressed.find(key => key.value === KeyValues.S) ||
    keyboard.allKeysPressed.find(key => key.value === KeyValues.ArrowDown)
  ) {
    y = 1;
  }

  if (
    keyboard.allKeysPressed.find(key => key.value === KeyValues.D) ||
    keyboard.allKeysPressed.find(key => key.value === KeyValues.ArrowRight)
  ) {
    x = 1;
  } else if (
    keyboard.allKeysPressed.find(key => key.value === KeyValues.A) ||
    keyboard.allKeysPressed.find(key => key.value === KeyValues.ArrowLeft)
  ) {
    x = -1;
  }

  return {x, y};
}
