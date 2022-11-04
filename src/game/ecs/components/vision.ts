import {defineComponent, Types} from 'bitecs';

export const Vision = defineComponent({
  // The vision indicator mesh.
  associatedMeshEntity: Types.eid,
  // Vision radius.
  radius: Types.f32,
  target: Types.eid,
});
