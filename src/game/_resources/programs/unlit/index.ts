import {Color, RawShaderMaterial} from 'three';
import fragmentShaderSource from './unlit.frag';
import vertexShaderSource from './unlit.vert';

export function unlit() {
  return new RawShaderMaterial({
    uniforms: {
      u_color: {
        value: new Color(1, 0, 0),
      },
    },
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
  });
}
