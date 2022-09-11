import {defineComponent, Types} from 'bitecs';

export const Vision = defineComponent({
  meshEntityId: Types.eid,
  radius: Types.f32,
  target: Types.eid,
});
