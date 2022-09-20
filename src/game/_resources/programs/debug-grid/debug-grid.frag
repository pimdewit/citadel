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
