import {
  AdditiveBlending,
  DoubleSide,
  RawShaderMaterial,
  Texture,
  Vector2,
  Vector3,
} from 'three';
import fragmentShaderSource from './shield.frag';
import vertexShaderSource from '../default-vertex.vert';

export function shield(texture: Texture) {
  return new RawShaderMaterial({
    uniforms: {
      u_texture: {
        value: texture,
      },
      u_time: {
        value: 0,
      },
      u_speed: {
        value: new Vector2(0.05, 0.05),
      },
      u_shield_color: {
        value: new Vector3(0, 1, 0),
      },
      u_shield_force: {
        value: 0.0,
      },
      u_shield_noise_force: {
        value: 0.95,
      },
    },
    depthWrite: false,
    // alphaTest: 0.1,
    blending: AdditiveBlending,
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
    side: DoubleSide,
  });
}
