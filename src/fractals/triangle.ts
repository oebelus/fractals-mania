import * as THREE from "three";
import { Pyramid } from "../structures/Pyramid";

let pyramids: THREE.LineSegments[] = [];

export function SierpinskiTriangle(size: number, position: THREE.Vector3) {
  const offset = size / 4;

  if (size <= 1) pyramids.push(new Pyramid(1, position).create());
  else {
    pyramids.push(new Pyramid(size, position).create());

    // top
    SierpinskiTriangle(
      size / 2,
      new THREE.Vector3(position.x, position.y + offset, position.z)
    );

    // back & left
    SierpinskiTriangle(
      size / 2,
      new THREE.Vector3(
        position.x - 1.7 * offset,
        position.y - offset,
        position.z - offset
      )
    );

    // back & right
    SierpinskiTriangle(
      size / 2,
      new THREE.Vector3(
        position.x + 1.7 * offset,
        position.y - offset,
        position.z - offset
      )
    );

    // front
    SierpinskiTriangle(
      size / 2,
      new THREE.Vector3(
        position.x,
        position.y - offset,
        position.z + 2 * offset
      )
    );

    return pyramids;
  }
}
