import {vector2} from '../math/vector2';

export class Pointer {
  readonly xy = vector2();
  readonly viewportDimensions = new Int16Array(2);

  constructor() {
    this.onResize();
  }

  get x() {
    return this.xy[0];
  }

  get y() {
    return this.xy[1];
  }

  readonly onPointerMove = (event: PointerEvent) => {
    this.xy[0] = Math.round(event.x) / this.viewportDimensions[0] - 0.5;
    this.xy[1] = Math.round(event.y) / this.viewportDimensions[1] - 0.5;
  };

  readonly onResize = () => {
    this.viewportDimensions[0] = window.innerWidth;
    this.viewportDimensions[1] = window.innerHeight;
  };

  dispose() {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('resize', this.onResize);
  }
}
