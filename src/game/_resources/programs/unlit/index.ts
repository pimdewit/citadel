import {Color, RawShaderMaterial} from 'three';
import fragmentShaderSource from './unlit.frag';
import vertexShaderSource from '../default-vertex.vert';

export function unlit() {
  return new RawShaderMaterial({
    uniforms: {
      u_color: {
        value: new Color(1, 0, 0),
      },
    },
    wireframe: true,
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
  });
}
