import {defineSystem} from 'bitecs';
import {drawObjectList} from 'twgl.js';
import {World} from '../../../types';

export function glRenderSystem() {
  return defineSystem((world: World) => {
    const gl = world.gl;
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const meshes = Array.from(world.meshes.values());
    drawObjectList(gl, meshes);
    return world;
  });
}
