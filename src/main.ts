import { Pyramid } from "./structures/Pyramid";
import { Sphere } from "./structures/Sphere";
import { Cube } from "./structures/Cube";
import { Shape } from "./types/shape";
import * as THREE from "three";
import World from "./World";

let world = new World("Pyramid");

const fractal = document.getElementById("script");

const size = 20;
const cubeSize = 7;
const coordinates = new THREE.Vector3(0, 0, 0);

function drawFractal(shape: Shape) {
  if (shape === ("Pyramid" as Shape)) {
    const pyramids = new Pyramid(size, coordinates);
    const SierpinskiTriangle = pyramids.generateFractal(size, coordinates);
    SierpinskiTriangle.forEach((pyramid) => {
      pyramid.userData.isFractal = true;
      world.scene.add(pyramid);
    });
  } else if (shape === ("Cube" as Shape)) {
    const cubes = new Cube(cubeSize, coordinates);

    const SierpinskiCarpet = cubes.generateFractal(cubeSize, coordinates);

    SierpinskiCarpet.forEach((cube) => {
      cube.userData.isFractal = true;
      world.scene.add(cube);
    });
  } else if (shape === "Sphere") {
    const spheres = new Sphere(size, coordinates);
    const fractalSphere = spheres.generateFractal(size, coordinates);
    fractalSphere.forEach((sphere) => {
      sphere.userData.isFractal = true;
      world.scene.add(sphere);
    });
  }
}

drawFractal(fractal?.className as Shape);

const animate = function () {
  requestAnimationFrame(animate);

  world.renderer.render(world.scene, world.camera);
};
animate();
