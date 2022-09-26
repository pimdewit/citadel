#version 300 es

precision mediump float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

layout(location = 0) in vec3 position;
layout(location = 1) in vec2 uv;

out vec2 v_texCoord;

void main() {
  vec4 projected = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_texCoord = uv;
  gl_Position = projected;
}

