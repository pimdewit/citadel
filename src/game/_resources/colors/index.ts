import {Color} from 'three';

export enum ColorIdentifier {
  BLACK,
  WHITE,
  RED,
  GREEN,
  BLUE,
}

export function colors() {
  const map = new Map<number, Color>();
  map.set(ColorIdentifier.BLACK, new Color(0, 0, 0));
  map.set(ColorIdentifier.WHITE, new Color(1, 1, 1));
  map.set(ColorIdentifier.RED, new Color(1, 0, 0));
  map.set(ColorIdentifier.GREEN, new Color(0, 1, 0));
  map.set(ColorIdentifier.BLUE, new Color(0, 0, 1));

  return (identifier: ColorIdentifier) => map.get(identifier)!;
}
