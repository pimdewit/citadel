import {createProgramInfo, m4} from 'twgl.js';
import fragmentShaderSource from './phong.frag';
import vertexShaderSource from './phong.vert';

export function phong(gl: WebGLRenderingContext) {
  return createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
}

export interface PhongUniforms {
  u_diffuse: WebGLTexture;
  u_viewInverse: m4.Mat4;
  u_world: m4.Mat4;
  u_worldInverseTranspose: m4.Mat4;
  u_worldViewProjection: m4.Mat4;
  u_lightWorldPos: number[];
  u_lightColor: number[];
  u_ambient: number[];
  u_specular: number[];
  u_shininess: number;
  u_specularFactor: 0;
}

export function phongUniforms(
  diffuse: WebGLTexture,
  camera: m4.Mat4
): PhongUniforms {
  return {
    u_diffuse: diffuse,
    u_viewInverse: camera,
    u_world: m4.identity(),
    u_worldInverseTranspose: m4.identity(),
    u_worldViewProjection: m4.identity(),
    u_lightWorldPos: [10, 10, 100],
    u_lightColor: [1, 1, 1, 1],
    u_ambient: [0, 0, 0, 1],
    u_specular: [1, 1, 1, 1],
    u_shininess: 1,
    u_specularFactor: 0,
  };
}
