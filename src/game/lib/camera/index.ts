import {m4} from 'twgl.js';
import {vector3} from '../math/vector3';

const up = vector3(0, 1, 0);

export class Camera {
  readonly id = m4.identity();
  readonly view = m4.identity();
  readonly viewProjection = m4.identity();
  /** LookAt target. */
  readonly target = vector3();
  /** Local position of the camera in the scene. */
  readonly position = vector3(0, 10, 20);
  perspective = m4.perspective(0.5, 2, 0.1, 1000);

  update() {
    m4.lookAt(this.position, this.target, up, this.id);
    m4.inverse(this.id, this.view);
    m4.multiply(this.perspective, this.view, this.viewProjection);
  }
}
