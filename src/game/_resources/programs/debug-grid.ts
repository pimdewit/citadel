import {createProgramInfo, m4} from 'twgl.js';
import {vector3} from '../../lib/math/vector3';
import {Vector3} from '../../lib/math/vector3/typings';

//language=GLSL
const vertexShaderSource = `
  #version 300 es

  precision mediump float;

  uniform mat4 u_worldViewProjection;

  layout(location = 0) in vec4 a_position;
  layout(location = 1) in vec2 a_texcoord;

  out vec4 v_position;
  out vec2 v_texCoord;

  void main() {
    v_texCoord = a_texcoord;
    v_position = (u_worldViewProjection * a_position);
    gl_Position = v_position;
  }
`;

//language=GLSL
const fragmentShaderSource = `
  #version 300 es

  precision mediump float;

  uniform vec3 u_color;
  
  in vec2 v_texCoord;
  out vec4 FragColor;

  float grid(vec2 st, float res) {
    vec2 grid = fract(st * res);
    return step(res, grid.x) * step(res, grid.y);
  }

  void main() {
    vec2 grid_uv = v_texCoord.xy * 300.0;
    float x = grid(grid_uv, 0.06018);

    float color = 1.0 - x;
    if (color <= 0.2) discard;

    FragColor = vec4(u_color, 1.0);
  }
`;

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
