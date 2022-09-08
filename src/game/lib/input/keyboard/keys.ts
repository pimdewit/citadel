import {Key} from './key';

export enum KeyValues {
  W = 'w',
  A = 'a',
  S = 's',
  D = 'd',
  ArrowUp = 'ArrowUp',
  ArrowLeft = 'ArrowLeft',
  ArrowDown = 'ArrowDown',
  ArrowRight = 'ArrowRight',
  Space = ' ',
}

export class WKey extends Key {
  readonly value = KeyValues.W;
}

export class AKey extends Key {
  readonly value = KeyValues.A;
}

export class SKey extends Key {
  readonly value = KeyValues.S;
}

export class DKey extends Key {
  readonly value = KeyValues.D;
}

export class ArrowUpKey extends Key {
  readonly value = KeyValues.ArrowUp;
}

export class ArrowLeftKey extends Key {
  readonly value = KeyValues.ArrowLeft;
}

export class ArrowDownKey extends Key {
  readonly value = KeyValues.ArrowDown;
}

export class ArrowRightKey extends Key {
  readonly value = KeyValues.ArrowRight;
}

export class SpaceKey extends Key {
  readonly value = KeyValues.Space;
}
