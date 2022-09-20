import {defineComponent, Types} from 'bitecs';

export const Mesh = defineComponent({
  geometry: Types.i8,
  newInstance: Types.i8,
  program: Types.i8,
  parent: Types.eid,
});
