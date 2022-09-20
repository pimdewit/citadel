import {defineQuery, defineSystem, enterQuery, exitQuery} from 'bitecs';
import {
  BufferAttribute,
  BufferGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
} from 'three';
import {World} from '../../types';
import {Vision} from '../components/vision';

export function visionDetectedSystem() {
  const towerQuery = defineQuery([Vision]);
  const towerQueryEnter = enterQuery(towerQuery);
  const towerQueryExit = exitQuery(towerQuery);

  return defineSystem((world: World) => {
    const towers = towerQuery(world);
    const towersEntered = towerQueryEnter(world);
    const towersExited = towerQueryExit(world);

    for (let i = 0; i < towersEntered.length; ++i) {
      const tower = towersEntered[i];

      const geometry = new BufferGeometry();
      const positions = new Float32Array(2 * 3);
      geometry.setAttribute('position', new BufferAttribute(positions, 3));
      geometry.setDrawRange(0, 2);
      const material = new LineBasicMaterial({color: 0xffff99});
      const line = new Line(geometry, material);
      world.scene.add(line);

      world.towerLines.set(tower, line);
    }

    for (let i = 0; i < towers.length; ++i) {
      const tower = towers[i];

      const line = world.towerLines.get(tower) as Line;
      if (!line) continue;
      const meshB = world.sceneGraphNodes.get(Vision.target[tower]);
      if (!meshB) {
        line.visible = false;
        continue;
      }
      const meshA = world.sceneGraphNodes.get(tower);
      if (!meshA) continue;

      const points = [meshA.position, meshB.position];
      line.geometry.setFromPoints(points);
      line.visible = true;

      //  setInterval(() => {
      //     // Move boxes
      //     dt++;
      //
      //     boxes.forEach((box, index) => {
      //       box.position.y = Math.sin((dt / 360) + index);
      //     });
      //
      //     // Update the line with world positions of boxes
      //     const points = boxes.map(box => {
      //       const boxPosition = new THREE.Vector3();
      //
      //       box.getWorldPosition(boxPosition);
      //
      //       return boxPosition;
      //     });
      //
      //     line.geometry.setFromPoints(points);
      //   }, 1 / 120);
    }

    for (let i = 0; i < towersExited.length; ++i) {
      const tower = towersExited[i];

      const mesh = world.towerLines.get(tower) as Mesh;
      world.scene.remove(mesh);
      mesh.geometry.dispose();
      world.towerLines.delete(tower);
    }

    return world;
  });
}
