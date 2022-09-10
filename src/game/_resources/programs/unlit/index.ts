import {createProgramInfo, m4} from 'twgl.js';
import {vector3} from '../../../lib/math/vector3';
import {Vector3} from '../../../lib/math/vector3/typings';
import fragmentShaderSource from './unlit.frag';
import vertexShaderSource from './unlit.vert';

export function unlit(gl: WebGLRenderingContext) {
  return createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
}

export interface UnlitUniforms {
  u_world: m4.Mat4;
  u_worldInverseTranspose: m4.Mat4;
  u_worldViewProjection: m4.Mat4;
  u_color: Vector3;
}

export function unlitUniforms(): UnlitUniforms {
  return {
    u_world: m4.identity(),
    u_worldInverseTranspose: m4.identity(),
    u_worldViewProjection: m4.identity(),
    u_color: vector3(1, 0, 0),
  };
}
