import * as THREE from "three";

export class SceneManager {
  scene: THREE.Scene;
  backgroundColor: number;

  constructor(backgroundColor: number = 0xf0f0f0) {
    this.scene = new THREE.Scene();
    this.backgroundColor = backgroundColor;
    this.scene.background = new THREE.Color(backgroundColor);
    this.setupLighting();
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 15, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.set(-10, 10, -10);
    this.scene.add(pointLight);
  }

  addObject(object: THREE.Object3D): void {
    console.log(
      `[SceneManager] Adding object:`,
      object.name || "unnamed",
      `visible: ${object.visible}`,
      `children: ${object.children.length}`,
    );
    this.scene.add(object);
    console.log(
      `[SceneManager] Scene now has ${this.scene.children.length} children`,
    );
  }

  removeObject(object: THREE.Object3D): void {
    this.scene.remove(object);
  }

  dispose(): void {
    this.scene.clear();
  }
}
