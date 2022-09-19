import {Camera} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {CameraOrbitControls} from '../../ecs/components/camera/camera-orbit-controls';

export function orbitControls(
  camera: Camera,
  domElement: HTMLElement,
  entity: number
) {
  const controls = new OrbitControls(camera, domElement);
  controls.minPolarAngle = CameraOrbitControls.minPolarAngle[entity];
  controls.maxPolarAngle = CameraOrbitControls.maxPolarAngle[entity];
  controls.minDistance = CameraOrbitControls.minDistance[entity];
  controls.maxDistance = CameraOrbitControls.maxDistance[entity];
  controls.dampingFactor = CameraOrbitControls.dampingFactor[entity];
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = true;

  return controls;
}
