#version 300 es

precision mediump float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

layout(location = 0) in vec3 position;

void main() {
  vec4 projected = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = projected;
}