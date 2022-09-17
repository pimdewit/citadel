#version 300 es

precision mediump float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

layout(location = 0) in vec4 a_position;

out vec4 v_position;
out vec2 v_texCoord;

void main() {
  vec4 projected = projectionMatrix * modelViewMatrix * vec4(1.0);
  gl_Position = projected;
}