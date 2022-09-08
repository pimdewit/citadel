import {m4} from 'twgl.js';
import {vector3} from '../math/vector3';

export class Camera {
  readonly id = m4.identity();
  readonly view = m4.identity();
  readonly viewProjection = m4.identity();
  /** LookAt target. */
  readonly target = vector3();
  /** Local position of the camera in the scene. */
  readonly position = vector3();
}
