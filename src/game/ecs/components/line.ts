import {defineComponent, Types} from 'bitecs';

export const Line = defineComponent({
  start: Types.eid,
  end: Types.eid,
});
