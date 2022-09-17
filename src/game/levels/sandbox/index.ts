import {addComponent} from 'bitecs';
import {WebGLRenderer} from 'three';
import {CameraNeedsUpdate} from '../../ecs/components/camera/camera-needs-update';
import {CameraPerspective} from '../../ecs/components/camera/camera-perspective';
import {RenderPipeline, World} from '../../types';
import {createWorld} from './create-world';
import {renderPipeline} from './render-pipeline';

export class Sandbox {
  readonly world: World;
  readonly renderPipeline: RenderPipeline;

  constructor(renderer: WebGLRenderer) {
    this.world = createWorld(renderer);
    this.renderPipeline = renderPipeline();
  }

  readonly resize = (width: number, height: number) => {
    this.world.pointer.resize(width, height);

    for (const id of this.world.cameras.keys()) {
      CameraPerspective.aspect[id] = width / height;
      addComponent(this.world, CameraNeedsUpdate, id);
    }
  };

  update() {
    this.renderPipeline(this.world);
  }
}
