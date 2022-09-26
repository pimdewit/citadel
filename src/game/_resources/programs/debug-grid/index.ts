import {Color, RawShaderMaterial} from 'three';
import fragmentShaderSource from './debug-grid.frag';
import vertexShaderSource from '../default-vertex.vert';

export function debugGrid() {
  return new RawShaderMaterial({
    uniforms: {
      u_color: {
        value: new Color(0.15, 0.17, 0.2),
      },
    },
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
  });
}
