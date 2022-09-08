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
  readonly position = vector3();
  /** Field of view in radians. (default is ((30 * Math.PI) / 180)). */
  fov = 0.5235987755982988;
  /** Camera frustum aspect ratio. Defaults to 2 (initial browser canvas size, 300w / 150h). */
  aspect = 2;
  zNear = 0.5;
  zFar = 100;

  update() {
    const projection = m4.perspective(
      this.fov,
      this.aspect,
      this.zNear,
      this.zFar
    );

    m4.lookAt(this.position, this.target, up, this.id);
    m4.inverse(this.id, this.view);
    m4.multiply(projection, this.view, this.viewProjection);
  }
}
