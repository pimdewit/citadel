//language=GLSL
import {createProgramInfo, m4} from 'twgl.js';

const vertexShaderSource = `
  #version 300 es

  precision mediump float;

  uniform mat4 u_worldViewProjection;
  uniform vec3 u_lightWorldPos;
  uniform mat4 u_world;
  uniform mat4 u_viewInverse;
  uniform mat4 u_worldInverseTranspose;

  layout(location = 0) in vec4 a_position;
  layout(location = 1) in vec2 a_texcoord;
  layout(location = 2) in vec3 a_normal;

  out vec4 v_position;
  out vec2 v_texCoord;
  out vec3 v_normal;
  out vec3 v_surfaceToLight;
  out vec3 v_surfaceToView;

  void main() {
    v_texCoord = a_texcoord;
    v_position = (u_worldViewProjection * a_position);
    v_normal = (u_worldInverseTranspose * vec4(a_normal, 0)).xyz;
    v_surfaceToLight = u_lightWorldPos - (u_world * a_position).xyz;
    v_surfaceToView = (u_viewInverse[3] - (u_world * a_position)).xyz;
    gl_Position = v_position;
  }
`;

//language=GLSL
const fragmentShaderSource = `
  #version 300 es

  precision mediump float;

  in vec4 v_position;
  in vec2 v_texCoord;
  in vec3 v_normal;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;
  out vec4 FragColor;

  uniform vec4 u_lightColor;
  uniform vec4 u_ambient;
  uniform sampler2D u_diffuse;
  uniform vec4 u_specular;
  uniform float u_shininess;
  uniform float u_specularFactor;

  vec4 lit(float l, float h, float m) {
    return vec4(1.0,
    max(l, 0.0),
    (l > 0.0) ? pow(max(0.0, h), m) : 0.0,
    1.0);
  }

  void main() {
    vec4 diffuseColor = texture(u_diffuse, v_texCoord);
    vec3 a_normal = normalize(v_normal);
    vec3 surfaceToLight = normalize(v_surfaceToLight);
    vec3 surfaceToView = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLight + surfaceToView);
    vec4 litR = lit(dot(a_normal, surfaceToLight),
    dot(a_normal, halfVector), u_shininess);
    vec4 outColor = vec4((
    u_lightColor * (diffuseColor * litR.y + diffuseColor * u_ambient + u_specular * litR.z * u_specularFactor)).rgb,
    diffuseColor.a);
    FragColor = outColor;
  }
`;

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
