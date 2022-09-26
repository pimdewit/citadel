#version 300 es

precision mediump float;

uniform float u_time;
uniform sampler2D u_texture;

uniform vec2 u_speed;
uniform vec3 u_shield_color;
uniform float u_shield_noise_force;

in vec2 v_texCoord;
out vec4 FragColor;

void main() {
  vec2 perlin = texture(u_texture, -v_texCoord).xy / 0.00001 + u_time * u_speed;

  float red = texture(u_texture, perlin).r * 10.0;
  float redModifier = sin(cos(red * 10.0));
  float redClamped = clamp((redModifier - 0.4), 0.0, 1.0);
  float noise = redClamped * u_shield_noise_force;

  float alpha = -0.5 + (v_texCoord.y / 1.2) + noise;
  //  alpha *= v_texCoord.y / 3.2;

  vec3 color = u_shield_color;
  color.b += alpha;

  FragColor.rgb = color;
  FragColor.a = alpha;
}
