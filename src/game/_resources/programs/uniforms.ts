import {World} from '../../types';
import {texture, TextureIdentifier} from '../textures';
import {debugGridUniforms} from './grid';
import {ProgramIdentifier} from './index';
import {phongUniforms} from './phong';
import {unlitUniforms} from './unlit';

export function uniformsFactory(world: World, identifier: ProgramIdentifier) {
  const [camera] = world.cameras.values();

  switch (identifier) {
    case ProgramIdentifier.UNLIT:
      return unlitUniforms();
    case ProgramIdentifier.PHONG:
      return phongUniforms(texture(TextureIdentifier.DEBUG), camera.id);
    default:
      return debugGridUniforms();
  }
}
