#version 300 es

precision mediump float;

uniform vec3 u_color;

out vec4 FragColor;

void main() {
  FragColor = vec4(u_color, 1.0);
}