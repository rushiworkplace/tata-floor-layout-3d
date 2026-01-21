import * as THREE from "three";

export class Renderer {
  renderer: THREE.WebGLRenderer;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.setSize(window.innerWidth, window.innerHeight);
  }

  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height);
  }

  render(scene: THREE.Scene, camera: THREE.Camera): void {
    this.renderer.render(scene, camera);
  }

  onWindowResize(width: number, height: number): void {
    this.setSize(width, height);
  }

  dispose(): void {
    this.renderer.dispose();
  }
}
