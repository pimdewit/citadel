import {Color, MeshBasicMaterial, RawShaderMaterial, Vector3} from "three";
import fragmentShaderSource from './unlit.frag';
import vertexShaderSource from './unlit.vert';

export function unlit() {

  return new MeshBasicMaterial({color: new Color(0, 1, 0)});

  // return new RawShaderMaterial({
  //   uniforms: {
  //     u_color: {
  //       value: new Vector3(1, 0, 0)
  //     },
  //   }, vertexShader: vertexShaderSource, fragmentShader: fragmentShaderSource,
  // });
}
