import {createProgramInfo, m4} from 'twgl.js';
import {vector3} from '../../../lib/math/vector3';
import {Vector3} from '../../../lib/math/vector3/typings';
import vertexShaderSource from './grid.vert';
import fragmentShaderSource from './grid.frag';

export function debugGrid(gl: WebGLRenderingContext) {
  return createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
}

export interface DebugGridUniforms {
  u_world: m4.Mat4;
  u_worldViewProjection: m4.Mat4;
  u_color: Vector3;
}

export function debugGridUniforms(): DebugGridUniforms {
  return {
    u_world: m4.identity(),
    u_worldViewProjection: m4.identity(),
    u_color: vector3(0, 0, 1),
  };
}
