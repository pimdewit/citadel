import {defineComponent, Types} from 'bitecs';

export const Transform = defineComponent({
  positionX: Types.f32,
  positionY: Types.f32,
  positionZ: Types.f32,
  rotationX: Types.f32,
  rotationY: Types.f32,
  rotationZ: Types.f32,
  scaleX: Types.f32,
  scaleY: Types.f32,
  scaleZ: Types.f32,
});
