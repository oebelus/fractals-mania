import * as THREE from "three";
import Shape from "./Shape";

export class Pyramid extends Shape {
  public create() {
    const geometry = new THREE.ConeGeometry(this.size, this.size, 3);
    const edges = new THREE.EdgesGeometry(geometry);
    const pyramid = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    pyramid.position.set(this.position.x, this.position.y, this.position.z);

    return pyramid;
  }

  public generateFractal(
    size: number,
    position: THREE.Vector3
  ): THREE.Object3D[] {
    const offset = size / 4;

    if (size <= 1) Pyramid.shapes.push(new Pyramid(1, position).create());
    else {
      Pyramid.shapes.push(new Pyramid(size, position).create());

      // top
      this.generateFractal(
        size / 2,
        new THREE.Vector3(position.x, position.y + offset, position.z)
      );

      // back & left
      this.generateFractal(
        size / 2,
        new THREE.Vector3(
          position.x - 1.7 * offset,
          position.y - offset,
          position.z - offset
        )
      );

      // back & right
      this.generateFractal(
        size / 2,
        new THREE.Vector3(
          position.x + 1.7 * offset,
          position.y - offset,
          position.z - offset
        )
      );

      // front
      this.generateFractal(
        size / 2,
        new THREE.Vector3(
          position.x,
          position.y - offset,
          position.z + 2 * offset
        )
      );
    }
    return Pyramid.shapes;
  }
}
