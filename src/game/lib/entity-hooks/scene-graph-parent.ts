import {Group} from '../../ecs/components/group';
import {World} from '../../types';

export function sceneGraphParent(world: World, entity: number) {
  return world.sceneGraphNodes.get(Group.parent[entity]) || world.scene;
}
