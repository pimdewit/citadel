import {defineComponent, Types} from 'bitecs';

export const CameraOrbitControls = defineComponent({
  minPolarAngle: Types.f32,
  maxPolarAngle: Types.f32,
  minDistance: Types.f32,
  maxDistance: Types.f32,
  dampingFactor: Types.f32,
});
