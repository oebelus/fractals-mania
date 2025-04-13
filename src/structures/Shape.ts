import * as THREE from "three";

export default abstract class Shape {
  public static shapes: THREE.Object3D[] = [];
  constructor(public size: number, public position: THREE.Vector3) {}

  public abstract create(): THREE.Object3D;
  public abstract generateFractal(
    size: number,
    position: THREE.Vector3
  ): THREE.Object3D[];
}
