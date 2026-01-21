import * as THREE from "three";
import gsap from "gsap";
import { frameCameraToBox } from "../utils/frameCameraToBox";

export class CameraManager {
  camera: THREE.PerspectiveCamera;
  targetPosition: THREE.Vector3;
  targetLookAt: THREE.Vector3;
  defaultPosition: THREE.Vector3;
  defaultLookAt: THREE.Vector3;
  orbitControls: any;
  isAnimating: boolean = false;

  constructor(width: number, height: number) {
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    this.defaultPosition = new THREE.Vector3(0, 0, 0);
    this.defaultLookAt = new THREE.Vector3(0, 0, 0);

    this.targetPosition = this.defaultPosition.clone();
    this.targetLookAt = this.defaultLookAt.clone();

    this.camera.position.copy(this.defaultPosition);
    this.camera.lookAt(this.defaultLookAt);
  }

  animateToProduct(mesh: THREE.Mesh, duration: number = 1.5): Promise<void> {
    return new Promise((resolve) => {
      this.isAnimating = true;

      const bbox = new THREE.Box3().setFromObject(mesh);
      const frameResult = frameCameraToBox(bbox, this.camera, 1.5);

      gsap.to(this.camera.position, {
        x: frameResult.position.x,
        y: frameResult.position.y,
        z: frameResult.position.z,
        duration,
        ease: "power2.inOut",
      });

      const lookAtAnimation = { t: 0 };
      gsap.to(lookAtAnimation, {
        t: 1,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          const current = this.targetLookAt.clone();
          current.lerp(frameResult.target, lookAtAnimation.t);
          this.camera.lookAt(current);
        },
        onComplete: () => {
          this.targetPosition = frameResult.position;
          this.targetLookAt = frameResult.target;
          this.isAnimating = false;
          resolve();
        },
      });
    });
  }

  setDefaultAisleView(bbox: THREE.Box3): void {
    const frameResult = frameCameraToBox(bbox, this.camera, 1.3);
    this.defaultPosition = frameResult.position.clone();
    this.defaultLookAt = frameResult.target.clone();

    console.log(
      "[CameraManager] setDefaultAisleView - position:",
      this.defaultPosition,
    );
    console.log(
      "[CameraManager] setDefaultAisleView - lookAt:",
      this.defaultLookAt,
    );

    this.camera.position.copy(this.defaultPosition);
    this.camera.lookAt(this.defaultLookAt);

    if (this.orbitControls) {
      this.orbitControls.target.copy(this.defaultLookAt);
      this.orbitControls.update();
    }
  }

  resetCamera(duration: number = 1.5): Promise<void> {
    return new Promise((resolve) => {
      this.isAnimating = true;

      gsap.to(this.camera.position, {
        x: this.defaultPosition.x,
        y: this.defaultPosition.y,
        z: this.defaultPosition.z,
        duration,
        ease: "power2.inOut",
      });

      const lookAtAnimation = { t: 0 };
      gsap.to(lookAtAnimation, {
        t: 1,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          const current = this.targetLookAt.clone();
          current.lerp(this.defaultLookAt, lookAtAnimation.t);
          this.camera.lookAt(current);
        },
        onComplete: () => {
          this.targetPosition = this.defaultPosition.clone();
          this.targetLookAt = this.defaultLookAt.clone();
          this.isAnimating = false;
          resolve();
        },
      });
    });
  }

  onWindowResize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  async initOrbitControls(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
  ): Promise<void> {
    // Dynamically import OrbitControls
    const { OrbitControls } =
      await import("three/examples/jsm/controls/OrbitControls.js");

    this.orbitControls = new OrbitControls(camera, renderer.domElement);
    this.orbitControls.target.set(0, 2, 0);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;
    this.orbitControls.autoRotate = false;
    this.orbitControls.autoRotateSpeed = 0;
    this.orbitControls.enableZoom = true;
    this.orbitControls.zoomSpeed = 1.2;
    this.orbitControls.enablePan = true;
    this.orbitControls.panSpeed = 0.5;
    this.orbitControls.minDistance = 3;
    this.orbitControls.maxDistance = 50;
    this.orbitControls.update();
  }

  updateOrbitControls(): void {
    if (this.orbitControls && !this.isAnimating) {
      this.orbitControls.update();
    }
  }

  disableOrbitControls(): void {
    if (this.orbitControls) {
      this.orbitControls.enabled = false;
    }
  }

  enableOrbitControls(): void {
    if (this.orbitControls) {
      this.orbitControls.enabled = true;
    }
  }
}
