import * as THREE from "three";
import Shape from "./Shape";

let isLine = false;

export class Cube extends Shape {
  public create(): THREE.Object3D {
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    const edges = new THREE.EdgesGeometry(geometry);
    let cube;

    if (isLine) {
      cube = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: "#114E98" })
      );
    } else {
      const material = new THREE.MeshStandardMaterial({ color: "blue" });
      const lines = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: "#114E98" })
      );
      cube = new THREE.Mesh(geometry, material);
      cube.add(lines);
    }

    cube?.position.set(this.position.x, this.position.y, this.position.z);
    return cube!;
  }

  public generateFractal(size: number, position: THREE.Vector3) {
    const offset = size / 3;

    if (size <= 1) Cube.shapes.push(new Cube(size, position).create());
    else {
      isLine = true;
      Cube.shapes.push(new Cube(size, position).create());

      // generate 1 and place it 9 * 9 * 9 times
      // const sub = this.generateFractal(
      //   size / 3,
      //   new THREE.Vector3(position.x, position.y, position.z)
      // );

      /*---------- TOP LAYER ----------*/

      // front top left
      isLine = false;
      this.generateFractal(
        size / 3,
        new THREE.Vector3(
          position.x - offset,
          position.y + offset,
          position.z + offset
        )
      );

      // front top middle
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x, position.y + offset, position.z + offset)
      );

      // front top right
      this.generateFractal(
        size / 3,
        new THREE.Vector3(
          position.x + offset,
          position.y + offset,
          position.z + offset
        )
      );

      // middle top left
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x - offset, position.y + offset, position.z)
      );

      isLine = true;
      // middle top middle
      Cube.shapes.push(
        new Cube(
          size / 3,
          new THREE.Vector3(position.x, position.y + offset, position.z)
        ).create()
      );

      isLine = false;
      // middle top right
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x + offset, position.y + offset, position.z)
      );

      // back top left
      this.generateFractal(
        size / 3,
        new THREE.Vector3(
          position.x - offset,
          position.y + offset,
          position.z - offset
        )
      );

      isLine = false;
      // back top middle
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x, position.y + offset, position.z - offset)
      );

      // back top right
      this.generateFractal(
        size / 3,
        new THREE.Vector3(
          position.x + offset,
          position.y + offset,
          position.z - offset
        )
      );

      /*---------- MIDDLE LAYER ----------*/
      isLine = false;
      // front middle left
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x - offset, position.y, position.z + offset)
      );

      // front middle middle
      isLine = true;
      Cube.shapes.push(
        new Cube(
          size / 3,
          new THREE.Vector3(position.x, position.y, position.z + offset)
        ).create()
      );

      isLine = false;
      // front middle right
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x + offset, position.y, position.z + offset)
      );

      isLine = true;
      // middle middle left
      Cube.shapes.push(
        new Cube(
          size / 3,
          new THREE.Vector3(position.x - offset, position.y, position.z)
        ).create()
      );

      // middle middle middle
      Cube.shapes.push(
        new Cube(
          size / 3,
          new THREE.Vector3(position.x, position.y, position.z)
        ).create()
      );

      // middle middle right
      Cube.shapes.push(
        new Cube(
          size / 3,
          new THREE.Vector3(position.x + offset, position.y, position.z)
        ).create()
      );

      isLine = false;
      // middle middle left
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x - offset, position.y, position.z - offset)
      );

      isLine = true;
      Cube.shapes.push(
        new Cube(
          size / 3,
          new THREE.Vector3(position.x, position.y, position.z - offset)
        ).create()
      );

      isLine = false;
      // middle middle right
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x + offset, position.y, position.z - offset)
      );

      /* BOTTOM LAYER */

      // front bottom left
      isLine = false;
      this.generateFractal(
        size / 3,
        new THREE.Vector3(
          position.x - offset,
          position.y - offset,
          position.z + offset
        )
      );

      // front bottom middle
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x, position.y - offset, position.z + offset)
      );

      // front bottom right
      this.generateFractal(
        size / 3,
        new THREE.Vector3(
          position.x + offset,
          position.y - offset,
          position.z + offset
        )
      );

      // middle bottom left
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x - offset, position.y - offset, position.z)
      );

      isLine = true;
      // middle bottom middle
      Cube.shapes.push(
        new Cube(
          size / 3,
          new THREE.Vector3(position.x, position.y - offset, position.z)
        ).create()
      );

      isLine = false;
      // middle bottom right
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x + offset, position.y - offset, position.z)
      );

      // back bottom left
      this.generateFractal(
        size / 3,
        new THREE.Vector3(
          position.x - offset,
          position.y - offset,
          position.z - offset
        )
      );

      isLine = false;
      // back bottom middle
      this.generateFractal(
        size / 3,
        new THREE.Vector3(position.x, position.y - offset, position.z - offset)
      );

      // back bottom right
      this.generateFractal(
        size / 3,
        new THREE.Vector3(
          position.x + offset,
          position.y - offset,
          position.z - offset
        )
      );
    }

    return Cube.shapes;
  }
}
