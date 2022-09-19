import {Color, RawShaderMaterial} from 'three';
import fragmentShaderSource from './debug-grid.frag';
import vertexShaderSource from './debug-grid.vert';

export function debugGrid() {
  return new RawShaderMaterial({
    uniforms: {
      u_color: {
        value: new Color(1, 1, 1),
      },
    },
    vertexShader: vertexShaderSource,
    fragmentShader: fragmentShaderSource,
  });
}
