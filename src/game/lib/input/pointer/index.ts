import {vector2} from '../../math/vector2';

export class Pointer {
  readonly xy = vector2();
  readonly viewportDimensions = new Int16Array(2);

  constructor() {
    this.resize();
  }

  get x() {
    return this.xy[0];
  }

  get y() {
    return this.xy[1];
  }

  storePointer(event: PointerEvent) {
    this.xy[0] = Math.round(event.x) / this.viewportDimensions[0] - 0.5;
    this.xy[1] = Math.round(event.y) / this.viewportDimensions[1] - 0.5;
  }

  readonly resize = (
    width = window.innerWidth,
    height = window.innerHeight
  ) => {
    this.viewportDimensions[0] = width;
    this.viewportDimensions[1] = height;
  };
}
