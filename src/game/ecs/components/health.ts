import {defineComponent, Types} from 'bitecs';

export const Health = defineComponent({
  current: Types.f32,
  total: Types.f32,
});
