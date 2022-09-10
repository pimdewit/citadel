import {vector2} from '../../math/vector2';
import {Vector2} from '../../math/vector2/typings';
import {Pointer} from './index';

export class DragPointer extends Pointer {
  pointerDown = false;
  readonly pointerDownPosition = vector2();
  readonly pointerDelta = vector2();
  readonly storedPosition = vector2();
  readonly position = vector2();
  private pointerCaptureTarget: HTMLElement | null = null;

  readonly onPointerDown = (event: PointerEvent) => {
    this.pointerDown = true;
    this.storePointer(event);
    this.pointerDownPosition[0] = this.xy[0];
    this.pointerDownPosition[1] = this.xy[1];

    this.pointerCaptureTarget = event.target as HTMLElement;
    this.pointerCaptureTarget.setPointerCapture(event.pointerId);

    this.applyDrag(this.pointerDownPosition);
  };

  readonly onPointerUp = (event: PointerEvent) => {
    if (!this.pointerDown) return;
    this.pointerDown = false;

    if (this.pointerCaptureTarget) {
      this.pointerCaptureTarget.releasePointerCapture(event.pointerId);
      this.pointerCaptureTarget = null;
    }

    this.storedPosition[0] += this.pointerDelta[0];
    this.storedPosition[1] += this.pointerDelta[1];
  };

  readonly onPointerMove = (event: PointerEvent) => {
    if (!this.pointerDown) return;
    this.storePointer(event);
    this.applyDrag(this.xy);
  };

  private applyDrag(vec2: Vector2) {
    const delta = this.calculatePointerDelta(vec2);
    this.pointerDelta[0] += delta[0];
    this.pointerDelta[1] += delta[1];

    this.position[0] = this.pointerDelta[0] + this.storedPosition[0];
    this.position[1] = this.pointerDelta[1] + this.storedPosition[1];
  }

  /** Calculate how many pixels the pointer has moved since last frame. */
  private calculatePointerDelta(vector2: Vector2) {
    return [
      vector2[0] - this.pointerDownPosition[0] - this.pointerDelta[0],
      vector2[1] - this.pointerDownPosition[1] - this.pointerDelta[1],
    ];
  }
}
