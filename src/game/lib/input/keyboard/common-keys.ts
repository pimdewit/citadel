import {
  AKey,
  ArrowDownKey,
  ArrowLeftKey,
  ArrowRightKey,
  ArrowUpKey,
  DKey,
  SKey,
  SpaceKey,
  WKey,
} from './keys';

export enum CommonKeys {
  WKey,
  AKey,
  SKey,
  DKey,
  ArrowUpKey,
  ArrowLeftKey,
  ArrowDownKey,
  ArrowRightKey,
  SpaceKey,
}

export function instantiateCommonKeys() {
  return [
    new WKey(),
    new AKey(),
    new SKey(),
    new DKey(),
    new ArrowUpKey(),
    new ArrowLeftKey(),
    new ArrowDownKey(),
    new ArrowRightKey(),
    new SpaceKey(),
  ];
}

export const commonKeys = instantiateCommonKeys();
