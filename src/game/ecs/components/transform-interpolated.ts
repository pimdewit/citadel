import {defineComponent, Types} from 'bitecs';

export const TransformInterpolated = defineComponent({
  /** Target position X. */
  positionX: Types.f32,
  /** Target position Y. */
  positionY: Types.f32,
  /** Target position Z. */
  positionZ: Types.f32,
  /** Target rotation X. */
  rotationX: Types.f32,
  /** Target rotation Y. */
  rotationY: Types.f32,
  /** Target rotation Z. */
  rotationZ: Types.f32,
  /** Target scale X. */
  scaleX: Types.f32,
  /** Target scale Y. */
  scaleY: Types.f32,
  /** Target scale Z. */
  scaleZ: Types.f32,
  /** Interpolation alpha. */
  alpha: Types.f32,
});
