export class Key {
  value = '';
  private _down = false;

  get down(): boolean {
    this._timeSinceDown = performance.now();
    return this._down;
  }

  set down(value: boolean) {
    this._down = value;
  }

  private _timeSinceDown = 0;

  get timeSinceDown(): number {
    return this._timeSinceDown;
  }

  set timeSinceDown(value: number) {
    this._timeSinceDown = value;
  }

  public reset() {
    this.down = false;
  }
}
