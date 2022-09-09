import {defineComponent, Types} from 'bitecs';

export const PositionInterpolationTarget = defineComponent({
  /** Target position X. */
  x: Types.f32,
  /** Target position Y. */
  y: Types.f32,
  /** Target position Z. */
  z: Types.f32,
  /** Interpolation alpha. */
  alpha: Types.f32,
});
