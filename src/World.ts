import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import { Shape } from "./types/shape";

export default class World {
  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public renderer: THREE.WebGLRenderer;
  public shape: Shape;

  constructor(shape: Shape) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.shape = shape;

    this.setLights();
    this.setRenderer();
    this.setControls();
  }

  setLights() {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
  }

  setRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  setControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target = new THREE.Vector3(0, 2.5, 0);
    controls.update();
  }
}
