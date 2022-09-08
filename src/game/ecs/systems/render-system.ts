import {defineSystem} from 'bitecs';
import {drawObjectList} from 'twgl.js';
import {visualMeshes} from '../shared-entities';

export function renderSystem(gl: WebGLRenderingContext) {
  return defineSystem(world => {
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const meshes = Array.from(visualMeshes.values());
    drawObjectList(gl, meshes);
    return world;
  });
}
