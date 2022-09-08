/**
 * @fileoverview
 * Inspired by Phaser4.
 */

import {Key} from './key';

export class Keyboard {
  readonly keys: Map<string, Key> = new Map();
  private _lastNavigationalKeyPressed: Key | null = null;

  constructor() {
    this.addEventListeners();
  }

  private _allKeysPressed: Key[] = [];

  get allKeysPressed() {
    return this._allKeysPressed;
  }

  get lastKeyPressed() {
    return this._allKeysPressed[this._allKeysPressed.length - 1];
  }

  addKeys(keys: Key[]): void {
    for (const key of keys) this.keys.set(key.value, key);
  }

  clearKeys(): void {
    this.keys.clear();
    this._allKeysPressed = [];
  }

  dispose() {
    this.removeEventListeners();
    this.clearKeys();
  }

  private readonly onKeyDown = (event: KeyboardEvent) => {
    const value = event.key;

    if (this.keys.has(value)) {
      const key = this.keys.get(value);

      if (key && !key.down) {
        key.down = true;
        this._allKeysPressed.push(key);
      }
    }
  };

  private readonly onKeyUp = (event: KeyboardEvent) => {
    const value = event.key;

    if (this.keys.has(value)) {
      const key = this.keys.get(value);

      if (key?.down) {
        key.down = false;
        const index = this._allKeysPressed.indexOf(key);
        if (index > -1) this._allKeysPressed.splice(index, 1);
      }
    }
  };

  private readonly onBlur = () => {
    this.keys.forEach(key => key.reset());
    this._allKeysPressed = [];
  };

  private addEventListeners() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
  }

  private removeEventListeners() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
  }
}
