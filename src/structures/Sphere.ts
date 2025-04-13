import * as THREE from "three";
import Shape from "./Shape";

export class Sphere extends Shape {
  public create(): THREE.Object3D {
    const geometry = new THREE.SphereGeometry(this.size, 32, 16);
    const material = new THREE.MeshStandardMaterial({ color: "violet" });

    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(this.position.x, this.position.y, this.position.z);

    return sphere;
  }

  public generateFractal(
    size: number,
    position: THREE.Vector3
  ): THREE.Object3D[] {
    if (size <= 1) Sphere.shapes.push(new Sphere(1, position).create());
    else {
      /* HORIZONTAL: LEFT RIGHT FRONT BACK */
      const newSize = size * (2 / 5);
      const offset = size * 2.5;

      Sphere.shapes.push(new Sphere(size, position).create());

      // LEFT
      this.generateFractal(
        newSize,
        new THREE.Vector3(position.x - offset, position.y, position.z)
      );

      // RIGHT
      this.generateFractal(
        newSize,
        new THREE.Vector3(position.x + offset, position.y, position.z)
      );

      // FRONT
      this.generateFractal(
        newSize,
        new THREE.Vector3(position.x, position.y, position.z + offset)
      );

      // BACK
      this.generateFractal(
        newSize,
        new THREE.Vector3(position.x, position.y, position.z - offset)
      );

      /* VERTICAL: TOP - BOTTOM */

      // TOP
      this.generateFractal(
        newSize,
        new THREE.Vector3(position.x, position.y + offset, position.z)
      );

      // BOTTOM
      this.generateFractal(
        newSize,
        new THREE.Vector3(position.x, position.y - offset, position.z)
      );
    }

    return Sphere.shapes;
  }
}
