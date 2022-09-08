import {defineComponent, Types} from 'bitecs';

export const CameraPerspective = defineComponent({
  fov: Types.f32,
  aspect: Types.f32,
  near: Types.f32,
  far: Types.f32,
});
