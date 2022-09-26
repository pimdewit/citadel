#version 300 es

precision mediump float;

uniform vec3 u_color1;
uniform vec3 u_color2;

in vec2 v_texCoord;
out vec4 FragColor;

void main() {
  vec3 color = u_color1 + (u_color2 * v_texCoord.y / 2.0);
  FragColor = vec4(color, 1.0);
}
