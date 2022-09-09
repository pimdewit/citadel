import {createProgramInfo, m4} from 'twgl.js';
import {vector3} from '../../lib/math/vector3';
import {Vector3} from '../../lib/math/vector3/typings';

//language=GLSL
const vertexShaderSource = `
  #version 300 es

  precision mediump float;

  uniform mat4 u_worldViewProjection;

  layout(location = 0) in vec4 a_position;

  out vec4 v_position;
  out vec2 v_texCoord;

  void main() {
    v_position = (u_worldViewProjection * a_position);
    gl_Position = v_position;
  }
`;

//language=GLSL
const fragmentShaderSource = `
  #version 300 es

  precision mediump float;

  uniform vec3 u_color;

  out vec4 FragColor;

  void main() {
    FragColor = vec4(u_color, 1.0);
  }
`;

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
