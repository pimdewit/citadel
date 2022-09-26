import {BackSide, Color, RawShaderMaterial} from 'three';
import fragmentShaderSource from './gradient.frag';
import vertexShaderSource from '../default-vertex.vert';

export function gradient() {
  return new RawShaderMaterial({
    uniforms: {
      u_color1: {
        value: new Color(0, 0, 0),
      },
      u_color2: {
        value: new Color(0.4, 0.4, 0.4),
      },
    },
    side: BackSide,
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
  });
}
