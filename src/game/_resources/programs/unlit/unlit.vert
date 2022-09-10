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