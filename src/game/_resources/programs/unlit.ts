//language=GLSL
import {createProgramInfo, m4} from 'twgl.js';

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

  uniform sampler2D u_diffuse;

  in vec2 v_texCoord;
  out vec4 FragColor;

  void main() {
    
    vec4 diffuse = texture(u_diffuse, v_texCoord);
    
    if (diffuse.r <= 0.2) discard;
    
    FragColor += diffuse;
  }
`;

export function unlit(gl: WebGLRenderingContext) {
  return createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
}

export interface UnlitUniforms {
  u_diffuse: WebGLTexture;
  u_viewInverse: m4.Mat4;
  u_world: m4.Mat4;
  u_worldInverseTranspose: m4.Mat4;
  u_worldViewProjection: m4.Mat4;
}

export function unlitUniforms(
  diffuse: WebGLTexture,
  camera: m4.Mat4
): UnlitUniforms {
  return {
    u_diffuse: diffuse,
    u_viewInverse: camera,
    u_world: m4.identity(),
    u_worldInverseTranspose: m4.identity(),
    u_worldViewProjection: m4.identity(),
  };
}
